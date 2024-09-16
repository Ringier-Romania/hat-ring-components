import {UtilsHelper_convertToInt} from "./UtilsHelper";

import NodeCache from "node-cache";
const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
const myCache = new NodeCache({stdTTL: stdTTL, checkperiod: 0, deleteOnExpire: false, useClones: false});

export function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }

    if(TTL === 0){
        return;
    }

    const ttl = TTL || stdTTL;
    key = JSON.stringify(key);
    myCache.set(key, value, ttl);
}

export function CacheHelper_get(key: any) {

    key = JSON.stringify(key);
    const value = myCache.get(key);
    const ttl = myCache.getTtl( key );
    const expired = ttl ? ttl - new Date().getTime() < 0 : true;
    if(expired){
        myCache.del(key);
    }
    handleCleanCache();
    return value;
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

export function CacheHelper_clearByPartialKey(partialKey: any, res = '') {
    const keys = myCache.keys();
    
    keys.forEach((key) => {
        if (key.includes(partialKey)) {
            myCache.del(key);
        }  
    });

    if (res === '1') {
        const values = myCache.mget(keys);
        keys.forEach((key) => {
            const value = JSON.stringify(values[key]);
            
            if (value?.includes(partialKey)) {                
                myCache.del(key);                
            }    
        })
    }
    handleCleanCache()
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
