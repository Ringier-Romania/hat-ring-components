import {CacheAdapterInterface} from "./types";
import NodeCache from "node-cache";
import {UtilsHelper_convertToInt} from "../../helpers/UtilsHelper";

export class NodeCacheAdapter implements CacheAdapterInterface {
    private cache: NodeCache;

    constructor() {
        const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
        const myCache = new NodeCache({stdTTL: stdTTL, checkperiod: 0, deleteOnExpire: false, useClones: false});
        this.cache = myCache;
    }

    async set(key: any, value: any, ttl: number | null | undefined, tags: string[] | null | boolean = null): Promise<void> {
        if (ttl) {
            this.cache.set(key, {value, ttl}, ttl);
            return;
        } else {
            this.cache.set(key, {value, ttl: undefined});
        }
    }

    get(key: any): any {
        // @ts-ignore
        return this.cache.get(key)?.value;
    }

    async flushAll(): Promise<void> {
        this.cache.flushAll();
    }

    async keys(): Promise<string[]> {
        return this.cache.keys();
    }

    async mget(keys: string[]) : Promise<{ [p: string]: unknown }> {
        return this.cache.mget(keys);
    }

    async del(key: any): Promise<number> {
        return this.cache.del(key);
    }

    async getTtl(key: any): Promise<number | undefined> {
        // @ts-ignore
        return this.cache.get(key)?.ttl;
    }

    async getExpirationTimestamp(key: any): Promise<number | undefined> {
        return this.cache.getTtl(key);
    }
}
