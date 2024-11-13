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
        await this.redisProvider.set({key, value, ttl: TTL});
    }

    async get(key: any): Promise<any> {
        const data = await this.redisProvider.get({key});
        return data;

    }

    async flushAll(): Promise<void> {
        const res = await this.redisProvider.flushAll();
    }

    async keys(keys: string[] = []): Promise<string[]> {
        return await this.redisProvider.keys(keys);
    }

    async mget(keys: string[]): Promise<{ [p: string]: unknown }> {
        return await this.redisProvider.mget(keys);
    }

    async del(key: any): Promise<number> {
        return await this.redisProvider.del(key);
    }

    async getTtl(key: any): Promise<number | undefined> {
        const data = await this.redisProvider.getTtl(key);
        return data;
    }


}
