import {UtilsHelper_convertToInt} from "./UtilsHelper";

export function CacheHelper_set(key: any, value: any) {
    if(!global.HATcache){
        global.HATcache = [];
    }
    key = JSON.stringify(key);
    // @ts-ignore
    global.HATcache[key] = value;
    global.HATcache[`timeStamp_${key}`] = new Date().getTime();
}

export function CacheHelper_get(key: any){
    handleCleanCache();
    key = JSON.stringify(key);
    if(global.HATcache && global.HATcache[key]){
        return global.HATcache[key]
    }

    return null;
}

export function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function){
    if(!global.HATcache){
        global.HATcache = [];
    }
    key = JSON.stringify(key);
    const timeStamp = global.HATcache[`timeStamp_${key}`] || Infinity;
    const currentTime = new Date().getTime();
    const TTL = process.env.KEY_CACHE_TTL ? UtilsHelper_convertToInt(process.env.KEY_CACHE_TTL) : 60;

    if (currentTime - timeStamp >= (TTL * 1000)) {
        callback();
    }
}

function handleCleanCache(){
    const currentTime = new Date().getTime();
    if(!global.lastHATCacheClean){
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.GLOBAL_CACHE_TTL ? UtilsHelper_convertToInt(process.env.GLOBAL_CACHE_TTL) : 60;
    if(currentTime - global.lastHATCacheClean > (TTL * 1000)){
        global.HATcache = [];
        global.lastHATCacheClean = currentTime;
    }
}
