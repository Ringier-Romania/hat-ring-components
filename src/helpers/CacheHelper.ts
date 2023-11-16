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
    if(!global.lastHATCacheClean){
        global.lastHATCacheClean = new Date().getTime();
    }

    const TTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
    if(new Date().getTime() - global.lastHATCacheClean > (TTL * 1000)){
        global.HATcache = [];
        global.lastHATCacheClean = new Date().getTime();
    }

}
