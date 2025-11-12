import {
    CacheHelper_get, CacheHelper_getDecoratedCachedObject, CacheHelper_getExpirationTimestamp, CacheHelper_getTtl,
    CacheHelper_set, CacheHelper_isExpired
} from "../helpers/CacheHelper";

interface CacheService {
    set(key: any, value: any, TTL: null | number | undefined, tags?: string[] | null | boolean): void;
    get(key: any): any;
    getDecoratedCachedObject(key: any): Promise<{ttl: number | undefined, value: any, expirationTimestamp: number | undefined}>;
    isExpired(rawCachedObject: {ttl: number | undefined, value: any, expirationTimestamp: number | undefined}, ttl: number | null): boolean;
    getTTL(key: any): number | undefined;
    getExpirationTimestamp(key: any): number | undefined;
}

export class CacheProvider {
    static async set(key: any, value: any, TTL: null | number | undefined = null, tags: string[] | null | boolean = null) {
        return await CacheHelper_set(key, value, TTL, tags);
    }

    static async get(key: any) {
        return await CacheHelper_get(key);
    }

    static async getDecoratedCachedObject(key: any) {
        return await CacheHelper_getDecoratedCachedObject(key);
    }

    static isExpired(rawCachedObject: {ttl: number | undefined, value: any, expirationTimestamp: number | undefined}, ttl: number | null) {
        return CacheHelper_isExpired(rawCachedObject, ttl);
    }

    static getTTL(key: any) {
        return CacheHelper_getTtl(key)
    }

    static getExpirationTimestamp(key: any) {
        return CacheHelper_getExpirationTimestamp(key)
    }
}
