import {UtilsHelper_convertToInt} from "./UtilsHelper";

import {RedisCacheAdapter} from "../adapters/cache/RedisCacheAdapter";
import {CacheAdapterInterface} from "../adapters/cache/types";
import {NodeCacheAdapter} from "../adapters/cache/NodeCacheAdapter";

const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;

let cacheAdapter: CacheAdapterInterface = new NodeCacheAdapter();
if (process.env.USE_REDIS == '1') {
    cacheAdapter = new RedisCacheAdapter();
}

export function CacheHelper_getCacheAdapter() {
    return cacheAdapter;
}

export async function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }

    if (TTL === 0) {
        return;
    }

    const ttl = TTL || stdTTL;
    key = JSON.stringify(key);
    await cacheAdapter.set(key, value, ttl);
}

export async function CacheHelper_get(key: any, removeOnExpire = false) {
    key = JSON.stringify(key);
    const value = await cacheAdapter.get(key);
    if (removeOnExpire) {
        const ttl = await cacheAdapter.getTtl(key);
        if (!ttl) {
            return value;
        }
        // @ts-ignore
        const expired = ttl ? ttl - new Date().getTime() < 0 : true;
        if (expired) {
            await cacheAdapter.del(key);
        }
    }
    handleCleanCache();
    return value;
}

export async function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
    key = JSON.stringify(key);
    const ttl = await cacheAdapter.getTtl(key);
    if (!ttl) {
        callback();
        return;
    }
    const expired = ttl ? ttl - new Date().getTime() < 0 : true;
    if (expired) {
        callback();
    }
}

export async function CacheHelper_flush() {
    return await cacheAdapter.flushAll();
}

export async function CacheHelper_clearByPartialKey(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false) {
    let keys: Array<string>= [];
    if (cacheAdapter.keysByGlob) {
        keys = await cacheAdapter.keysByGlob(`*${partialKey.join('*')}*`);
    } else {
        keys = await cacheAdapter.keys();
    }

    let values: any = {};

    if (searchInValue) {
        values = await cacheAdapter.mget(keys);
    }

    const deleteCount = {
        keys: 0,
        responses: 0,
    }

    keys.forEach((key) => {
        let deleted = false;
        if (partialKey.every((partKey) => key.includes(partKey))) {
            if (notInPartialKey.length > 0) {
                if (!notInPartialKey.every((partKey) => key.includes(partKey))) {
                    cacheAdapter.del(key);
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                cacheAdapter.del(key);
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        cacheAdapter.del(key);
                        deleteCount.responses++;
                    }
                } else {
                    cacheAdapter.del(key);
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export function CacheHelper_del(keys: any) {
    return cacheAdapter.del(keys);
}

export function CacheHelper_keys() {
    return cacheAdapter.keys();
}

export function CacheHelper_createParentChildRelation(parentId, childrenIds) {
    childrenIds.forEach((childrenId) => {  
        if (childrenId) {
            CacheHelper_set(`parent_${parentId}_child_${childrenId}`, '');
        }    
    })
}

function handleCleanCache() {
    const currentTime = new Date().getTime();
    if (!global.lastHATCacheClean) {
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.CACHE_CLEAN_INTERVAL ? UtilsHelper_convertToInt(process.env.CACHE_CLEAN_INTERVAL) : 60;
    if (currentTime - global.lastHATCacheClean > (TTL * 1000)) {
        global.HATCacheInCallInProgress = {};
        CacheHelper_flush();
        global.lastHATCacheClean = currentTime;
    }
}
