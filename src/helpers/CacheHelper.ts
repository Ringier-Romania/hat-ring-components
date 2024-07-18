import {UtilsHelper_convertToInt} from "./UtilsHelper";

import NodeCache from "node-cache";
const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 0;
const myCache = new NodeCache({stdTTL: stdTTL, checkperiod: 0, deleteOnExpire: false});

export function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }

    const ttl = TTL || process.env.CACHE_TTL;
    key = JSON.stringify(key);
    myCache.set(key, value, ttl);
}

export function CacheHelper_get(key: any) {
    handleCleanCache();
    key = JSON.stringify(key);
    return myCache.get(key);
}

export function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
    key = JSON.stringify(key);
    const ttl = myCache.getTtl( key );
    const expired = ttl ? ttl - new Date().getTime() < 0 : true;
     if(expired) {
        callback();
     }
}

export function CacheHelper_flush() {
    myCache.flushAll();
}

function handleCleanCache(){
    const currentTime = new Date().getTime();
    if(!global.lastHATCacheClean){
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.CACHE_CLEAN_INTERVAL ? UtilsHelper_convertToInt(process.env.CACHE_CLEAN_INTERVAL) : 60;
    if(currentTime - global.lastHATCacheClean > (TTL * 1000)){
        CacheHelper_flush();
        global.lastHATCacheClean = currentTime;
    }
}
