import {UtilsHelper_convertToInt} from "./UtilsHelper";

export function CacheHelper_set(key: any, value: any) {
    if(!global.HATcache){
        global.HATcache = [];
    }
    key = JSON.stringify(key);
    // @ts-ignore
    global.HATcache[key] = value;
}

export function CacheHelper_get(key: any){
    handleCleanCache();
    key = JSON.stringify(key);
    if(global.HATcache && global.HATcache[key] ){
        return global.HATcache[key];
    }

    return null;
}

function handleCleanCache(){
    const currentTime = new Date().getTime();
    if(!global.lastHATCacheClean){
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
    if(currentTime - global.lastHATCacheClean > (TTL * 1000)){
        global.HATcache = [];
        global.lastHATCacheClean = currentTime;
    }

}
