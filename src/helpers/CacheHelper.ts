import {UtilsHelper_convertToInt} from "./UtilsHelper";

export function CacheHelper_set(key: any, value: any) {
    if (process.env.CACHE_TTL === '0') {
        return;
    }
    if(!global.HATcache){
        global.HATcache = [];
    }
    key = JSON.stringify(key);
    global.HATcache[key] = value;
    global.HATcache[`timeStamp_${key}`] = new Date().getTime();
}

export function CacheHelper_get(key: any){
    if (process.env.CACHE_TTL === '0') {
        return null;
    }
    handleCleanCache();
    key = JSON.stringify(key);
    if(global.HATcache && global.HATcache[key]){
        return global.HATcache[key]
    }

    return null;
}

export function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function){
    if (process.env.CACHE_TTL === '0') {
        return;
    }
    if(!global.HATcache){
        global.HATcache = [];
    }
    key = JSON.stringify(key);
    const timeStamp = global.HATcache[`timeStamp_${key}`];
    const currentTime = new Date().getTime();
    const TTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;

    if (timeStamp && (currentTime - timeStamp >= (TTL * 1000))) {
        callback();
    }
}

function handleCleanCache(){
    const currentTime = new Date().getTime();
    if(!global.lastHATCacheClean){
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.CACHE_CLEAN_INTERVAL ? UtilsHelper_convertToInt(process.env.CACHE_CLEAN_INTERVAL) : 60;
    if(currentTime - global.lastHATCacheClean > (TTL * 1000)){
        global.HATcache = [];
        global.lastHATCacheClean = currentTime;
    }
}
