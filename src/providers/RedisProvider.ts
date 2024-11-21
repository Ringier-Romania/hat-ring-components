import {createClient, RedisClientType} from "redis";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {fromNodeProviderChain} from '@aws-sdk/credential-providers';
import {Hash} from '@aws-sdk/hash-node';
import {HttpRequest} from '@aws-sdk/protocol-http';
import {formatUrl} from "@aws-sdk/util-format-url";
import {MonitoringProvider} from "./MonitoringProvider";


interface RedisCacheValue {
    data: string;
    ttl: number | undefined;
}

export class RedisProvider {
    client: RedisClientType;
    url: string;
    replicationGroupId: string;
    service: string;
    region: string;
    username: string;

    constructor() {
        this.url = process.env.REDIS_RW;
        this.replicationGroupId = process.env.REDIS_REPLICATION_GROUP_ID;
        this.username = 'iam-user';
        this.region = 'eu-central-1';
        this.service = 'elasticache';

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

    async initialize() {
        const token = await this.getToken();
        const rwClient = createClient({
            username: this.username,
            password: token,
            database: 1,
            socket: {
                host: this.url,
                tls: true,
                reconnectStrategy: false,
            },
        }) as RedisClientType;

        await rwClient.connect();
        this.client = rwClient;
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
              }: {
        key: string;
        ttl?: number | null | undefined;
        value: string;
    }): Promise<void> {
        if (!this.client) {
            await this.initialize();
        }

        var expirationTimestamp: null | number = null;
        if (ttl) {
            expirationTimestamp = Date.now() + ttl * 1000;
        }
        const setValue = JSON.stringify({data: value, ttl: expirationTimestamp} as RedisCacheValue);
        await this.client.set(key, setValue);
    }

    async get({key}: {
        key: string;
    }): Promise<string | null> {
        if (!this.client) {
            await this.initialize();
        }

        const data = await this.client.get(key);
        if(!data){
            return null;
        }
        const parsedData = this._parseResponse(data);
        return parsedData.data;
    }

    async del(key: string): Promise<number> {
        if (!this.client) {
            await this.initialize();
        }
        return await this.client.del(key);
    }

    async delKeys(keys: Array<string>): Promise<number> {
        if (!this.client) {
            await this.initialize();
        }

        return await this.client.del(keys);
    }

    async flushAll(): Promise<any> {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.flushAll();
    }

    async keys(): Promise<string[]> {
        if (!this.client) {
            await this.initialize();
        }

        const keysFromRedis = await this.client.keys("*");
        return keysFromRedis;
    }

    async keysByGlob(globKey: string): Promise<string[]> {
        if (!this.client) {
            await this.initialize();
        }

        const keysFromRedis = await this.client.keys(globKey);
        return keysFromRedis;
    }

    async getTtl(key: string): Promise<number | undefined> {
        if (!this.client) {
            await this.initialize();
        }
        const data = await this.client.get(key);
        const parsedData = this._parseResponse(data);

        return parsedData.ttl;

    }

    _parseResponse(data: any): RedisCacheValue {
        var parsedData = data;
        try {
            if (typeof data === 'string') {
                parsedData = JSON.parse(data);
            }
            return parsedData.ttl && parsedData.data ? parsedData : {
                data: parsedData,
                ttl: undefined,
            };
        } catch (e) {
            console.error('Redis Error parsing data', data);
            return {
                data: data,
                ttl: undefined,
            }
        }
    }


    async stats() {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.info();
    }

    async mget(keys: string[]): Promise<{ [p: string]: unknown }> {
        if (!this.client) {
            await this.initialize();
        }
        const values = await this.client.mGet(keys);
        const result = {};
        keys.forEach((key, index) => {
            result[key] = values[index];
        });
        return result;
    }


}
