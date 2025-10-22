import {createClient, RedisClientType} from "redis";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {fromNodeProviderChain} from '@aws-sdk/credential-providers';
import {Hash} from '@aws-sdk/hash-node';
import {HttpRequest} from '@aws-sdk/protocol-http';
import {formatUrl} from "@aws-sdk/util-format-url";
import {MonitoringProvider} from "./MonitoringProvider";
import {ScanReply} from "@redis/client/dist/lib/commands/SCAN";


interface RedisCacheValue {
    data: string;
    ttl: number | undefined;
    expirationTimestamp: number | undefined;
}

export class RedisProvider {
    client: RedisClientType;
    url: string;
    replicationGroupId: string;
    service: string;
    region: string;
    username: string;
    maxReInitialize: number;
    currentReInitialize: number;

    constructor() {
        this.url = process.env.REDIS_RW;
        this.replicationGroupId = process.env.REDIS_REPLICATION_GROUP_ID;
        this.username = 'iam-user';
        this.region = 'eu-central-1';
        this.service = 'elasticache';
        this.maxReInitialize = 10;
        this.currentReInitialize = 0;

        setInterval(async () => {
            if (!this.client) {
                return;
            }
            const token = await this.getToken();
            if (!token) {
                MonitoringProvider.counter('error.redis.token.refresh');
                return;
            }

            await this.client.auth({
                username: 'iam-user',
                password: token,
            });


        }, 10 * 1000);
    }

    async createRedisClient() {
        const token = await this.getToken();
        this.client = createClient({
            username: this.username,
            password: token,
            database: 1,
            socket: {
                host: this.url,
                tls: true,
                reconnectStrategy: function (retries) {
                    if (retries > 20) {
                        console.error("Too many attempts to reconnect. Redis connection was terminated");
                        return new Error("Too many retries.");
                    } else {
                        MonitoringProvider.counter('error.RedisProvider.reconnectStrategy');
                        return retries * 500;
                    }
                },
            },
        }) as RedisClientType;
    }

    attachRedisErrorsHandler() {
        this.client.on('error', async (error) => {
            MonitoringProvider.counter(`error.redis.onError`);
            console.error(`Redis Client Error: ${error}`);

            if (error.message.toString().includes('ECONNRESET')) {
                if (this.currentReInitialize < this.maxReInitialize) {
                    this.currentReInitialize += 1;
                    MonitoringProvider.counter('info.RedisProvider.reinitialize_started');
                    await this.client.disconnect();
                    await this.createRedisClient();
                    this.attachRedisErrorsHandler();
                    await this.client.connect();
                    MonitoringProvider.counter('info.RedisProvider.reinitialize_ended');
                } else {
                    MonitoringProvider.counter('error.RedisProvider.reachedMaxReinitialize');
                    process.exit(1);
                }
            }
        });
    }

    async initialize() {
        try {
            await this.createRedisClient();
            this.attachRedisErrorsHandler();
            await this.client.connect();
            MonitoringProvider.counter('info.RedisProvider.initialize');
        } catch (err) {
            MonitoringProvider.counter('error.RedisProvider.initialize');
        }

    }

    async getToken(): Promise<string | undefined> {

        const signer = new SignatureV4({
            service: this.service,
            region: this.region,
            credentials: fromNodeProviderChain(),
            sha256: Hash.bind(null, 'sha256'),
        });

        const request = new HttpRequest({
            hostname: this.replicationGroupId,
            query: {
                Action: 'connect',
                User: this.username,
            },
            headers: {
                host: this.replicationGroupId,
            },
        });

        const presigned = await signer.presign(request, {
            expiresIn: 900,
        });

        return formatUrl(presigned).replace(`${request.protocol}//`, '');
    }

    async set({
                  key,
                  ttl,
                  value,
                  tags,
              }: {
        key: string;
        ttl?: number | null | undefined;
        value: string;
        tags?: string[] | null | boolean;
    }): Promise<void> {
        if (!this.client) {
            await this.initialize();
        }

        let expirationTimestamp: null | number = null;
        if (ttl) {
            expirationTimestamp = Date.now() + ttl * 1000;
        }
        const setValue = JSON.stringify({data: value, ttl, expirationTimestamp} as RedisCacheValue);
        try {
            await this.client.set(key, setValue);
            if (tags && typeof tags === 'object') {
                for (const tag of tags) {
                    await this.client.sAdd('tag:' + tag, key);
                }
            }
            MonitoringProvider.counter('info.RedisProvider.set');
        } catch (err) {
            MonitoringProvider.counter('error.RedisProvider.set');
        }
    }


    async get({key}: {
        key: string;
    }): Promise<string | null> {
        if (!this.client) {
            await this.initialize();
        }

        try {
            const data = await this.client.get(key);
            if (!data) {
                return null;
            }
            const parsedData = this._parseResponse(data, key);
            MonitoringProvider.counter('info.RedisProvider.get');
            return parsedData.data;
        } catch (err) {
            MonitoringProvider.counter('error.RedisProvider.get');
            return null;
        }

    }

    async getDecoratedCachedObject({key}: {
        key: string;
    }): Promise<RedisCacheValue | null> {
        if (!this.client) {
            await this.initialize();
        }

        try {
            const data = await this.client.get(key);
            if (!data) {
                return null;
            }
            const parsedData = this._parseResponse(data, key);
            MonitoringProvider.counter('info.RedisProvider.getDecoratedCachedObject');
            return parsedData;
        } catch (err) {
            MonitoringProvider.counter('error.RedisProvider.getDecoratedCachedObject');
            return null;
        }

    }

    async del(key: string): Promise<number> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.del');
        return await this.client.del(key);
    }

    async unlink(key: string): Promise<number> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.unlink');
        return await this.client.unlink(key);
    }

    async flushAll(): Promise<any> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.flushAll');
        return this.client.flushAll();
    }

    async keys(): Promise<string[]> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.keys');
        const keysFromRedis = await this.client.keys("*");
        return keysFromRedis;
    }


    async scan(cursor: number, match: string, count: number = 1000): Promise<ScanReply> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.scan');
        const keysFromRedis = await this.client.scan(cursor, {MATCH: match, COUNT: count});
        return keysFromRedis;
    }

    async keysByGlob(globKey: string): Promise<string[]> {
        if (!this.client) {
            await this.initialize();
        }

        MonitoringProvider.counter('info.RedisProvider.keysByGlob');
        const keysFromRedis = await this.client.keys(globKey);
        return keysFromRedis;
    }

    async getTtl(key: string): Promise<number | undefined> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.getTtl');
        const data = await this.client.get(key);
        const parsedData = this._parseResponse(data, key);

        return parsedData.ttl;

    }

    async getExpirationTimestamp(key: string): Promise<number | undefined> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.getExpirationTimestamp');
        const data = await this.client.get(key);
        const parsedData = this._parseResponse(data, key);

        return parsedData.expirationTimestamp;

    }

    _parseResponse(data: any, key?: string): RedisCacheValue {
        var parsedData = data;
        try {
            if (typeof data === 'string') {
                parsedData = JSON.parse(data);
            }
            return parsedData.ttl && parsedData.data ? parsedData : {
                data: parsedData,
                ttl: undefined,
                expirationTimestamp: undefined,
            };
        } catch (e) {
            console.error('Redis Error parsing data for key: ', key, data);
            return {
                data: data,
                ttl: undefined,
                expirationTimestamp: undefined,
            }
        }
    }


    async stats() {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.stats');
        return this.client.info();
    }

    async mget(keys: string[]): Promise<{ [p: string]: unknown }> {
        if (!this.client) {
            await this.initialize();
        }
        MonitoringProvider.counter('info.RedisProvider.mGet');
        const values = await this.client.mGet(keys);
        const result = {};
        keys.forEach((key, index) => {
            result[key] = values[index];
        });
        return result;
    }

    async getKeysByTag(tag) {
        if (!this.client) {
            await this.initialize();
        }
        return await this.client.sMembers(`tag:${tag}`);
    }

    async getValuesByTag(tag) {
        const keys = await this.getKeysByTag(tag);
        if (keys.length === 0) return [];
        return await this.client.mGet(keys);
    }

    async removeKeyFromTag(tag, key) {
        if (!this.client) {
            await this.initialize();
        }
        await this.client.sRem(`tag:${tag}`, key);
    }

    async removeTag(tag) {
        await this.client.del(`tag:${tag}`);
    }


    async addTag(tag, key) {
        await this.client.sAdd('tag:' + tag, key);
    }

    async flushAllAsync(): Promise<any> {
        return this.client.sendCommand(['FLUSHALL', 'ASYNC']);
    }
}
