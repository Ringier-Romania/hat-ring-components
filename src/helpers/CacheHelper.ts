import {UtilsHelper_convertToInt} from "./UtilsHelper";

import NodeCache from "node-cache";
const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 0;
const myCache = new NodeCache({stdTTL: stdTTL, checkperiod: 120});

export function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }3

    const ttl = TTL || process.env.CACHE_TTL;
    key = JSON.stringify(key);
    myCache.set(key, value, ttl);
}

export function CacheHelper_get(key: any) {
    key = JSON.stringify(key);
    return myCache.get(key);
}

export function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
    key = JSON.stringify(key);
     if(!myCache.get(key)) {
        callback();
     }
}

