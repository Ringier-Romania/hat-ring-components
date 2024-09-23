import {UtilsHelper_convertToInt} from "./UtilsHelper";

import NodeCache from "node-cache";

const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
const myCache = new NodeCache({stdTTL: stdTTL, checkperiod: 0, deleteOnExpire: false, useClones: false});

export function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }

    if (TTL === 0) {
        return;
    }

    const ttl = TTL || stdTTL;
    key = JSON.stringify(key);
    myCache.set(key, value, ttl);
}

export function CacheHelper_get(key: any, removeOnExpire = false) {
    key = JSON.stringify(key);
    const value = myCache.get(key);
    if (removeOnExpire) {
        const ttl = myCache.getTtl(key);
        const expired = ttl ? ttl - new Date().getTime() < 0 : true;
        if (expired) {
            myCache.del(key);
        }
    }
    handleCleanCache();
    return value;
}

export function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
    key = JSON.stringify(key);
    const ttl = myCache.getTtl(key);
    const expired = ttl ? ttl - new Date().getTime() < 0 : true;
    if (expired) {
        callback();
    }
}

export function CacheHelper_flush() {
    myCache.flushAll();
}

export function CacheHelper_clearByPartialKey(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false) {
    const keys = myCache.keys();
    let values: any = [];

    if (searchInValue) {
        values = myCache.mget(keys);
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
                    myCache.del(key);
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                myCache.del(key);
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        myCache.del(key);
                        deleteCount.responses++;
                    }
                } else {
                    myCache.del(key);
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export function CacheHelper_del(keys: any) {
    return myCache.del(keys);
}

export function CacheHelper_keys() {
    return myCache.keys();
}

export function CacheHelper_createParentChildRelation(parentId, childrenIds) {
    childrenIds.forEach((childrenId) => {
        CacheHelper_set(`parent_${parentId}_child_${childrenId}`, '');
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
