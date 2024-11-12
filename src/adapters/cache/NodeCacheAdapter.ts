import {CacheAdapterInterface} from "./types";
import NodeCache from "node-cache";

export class NodeCacheAdapter implements CacheAdapterInterface {
    private cache: NodeCache;

    constructor() {
        this.cache = new NodeCache();
    }

    async set(key: any, value: any, TTL: number | null | undefined): Promise<void> {
        if (TTL) {
            this.cache.set(key, value, TTL);
            return;
        } else {
            this.cache.set(key, value);
        }
    }

    get(key: any): any {
        return this.cache.get(key);
    }

    async flushAll(): Promise<void> {
        this.cache.flushAll();
    }

    async keys(keys: string[]): Promise<string[]> {
        return this.cache.keys();
    }

    async mget(keys: string[]) : Promise<{ [p: string]: unknown }> {
        return this.cache.mget(keys);
    }

    async del(key: any): Promise<number> {
        return this.cache.del(key);
    }

    async getTtl(key: any): Promise<number | undefined> {
        return this.cache.getTtl(key);
    }


}
