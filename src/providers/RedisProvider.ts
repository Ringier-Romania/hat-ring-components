import {createClient, RedisClientType} from "redis";
import {SignatureV4} from "@aws-sdk/signature-v4";
import {fromNodeProviderChain} from '@aws-sdk/credential-providers';
import {Hash} from '@aws-sdk/hash-node';
import {HttpRequest} from '@aws-sdk/protocol-http';
import {formatUrl} from "@aws-sdk/util-format-url";


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
        ttl?: number;
        value: string;
    }): Promise<void> {
        if (!this.client) {
            await this.initialize();
        }
        if (ttl) {
            await this.client.set(key, value, {
                EX: ttl,
            });
        } else {
            await this.client.set(key, value);
        }
    }

    async get({key}: {
        key: string;
    }): Promise<string | null> {
        if (!this.client) {
            await this.initialize();
        }

        const data = await this.client.get(key);
        return data;
    }

    async del(key: string): Promise<number> {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.del(key);
    }

    async flushAll(): Promise<void> {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.flushall();
    }

    async keys(): Promise<string[]> {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.keys('*');
    }

    async ttl(key: string): Promise<number | undefined> {
        if (!this.client) {
            await this.initialize();
        }
        return this.client.ttl(key);
    }


}
