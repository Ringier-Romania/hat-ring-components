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

export function CacheHelper_clearByPartialKey(partialKey: any, searchInValue = false) {
    const keys = myCache.keys();
    const deleteCount = {
        keys: 0,
        responses: 0,
    }
    keys.forEach((key) => {
        if (key.includes(partialKey)) {
            //console.log('deleting key', key);
            myCache.del(key);
            deleteCount.keys++;
        }
    });

    if (searchInValue) {
        const values = myCache.mget(keys);
        keys.forEach((key) => {
            const value = JSON.stringify(values[key]);
            if (value?.includes(partialKey)) {
               // console.log('deleting key for response', key);
                myCache.del(key);
                deleteCount.responses++;
            }
        })
    }
    handleCleanCache()
    return deleteCount;
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
