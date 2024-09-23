import {CacheAdapterInterface} from "./types";
import NodeCache from "node-cache";
import {RedisProvider} from "../../providers/RedisProvider";

export class RedisCacheAdapter implements CacheAdapterInterface {
    private redisProvider: RedisProvider;

    constructor() {
        const redisProvider = new RedisProvider();
        redisProvider.initialize();
        this.redisProvider = redisProvider;
    }


    async set(key: any, value: any, TTL: number | null | undefined): Promise<void> {
        if (TTL) {
            this.redisProvider.set({key, value, ttl: TTL});
            return;
        } else {
            this.redisProvider.set({key, value});
        }
    }

    async get(key: any): Promise<any> {
        this.redisProvider.get({key});
    }

    async flushAll(): Promise<void> {
        this.redisProvider.flushAll();
    }

    async keys(): Promise<string[]> {
        return await this.redisProvider.keys();
    }

    async mget(keys: string[]): Promise<{ [p: string]: unknown }> {
        return []
    }

    async del(key: any): Promise<number> {
        return await this.redisProvider.del(key);
    }

    async getTtl(key: any): Promise<number | undefined> {
        return await this.redisProvider.ttl(key);
    }


}
