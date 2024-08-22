import {CacheHelper_get, CacheHelper_runCallbackIfTimeStampHasExpired, CacheHelper_set} from "../helpers/CacheHelper";
import {UtilsHelper_convertToInt} from "../helpers/UtilsHelper";

interface CacheService {
    set(key: any, value: any, TTL: null | number | undefined): void;
    get(key: any): void;
    runCallbackIfTimeStampHasExpired(key: any, callback: Function): void;
    getTTL(key: any): number;
}

export class CacheProvider {
    static set(key: any, value: any, TTL: null | number | undefined = null) {
        return CacheHelper_set(key, value, TTL);
    }

    static get(key: any) {
        console.log(key)
        return CacheHelper_get(key);
    }

    static runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
        return CacheHelper_runCallbackIfTimeStampHasExpired(key, callback);
    }

    static getTTL(key: any) {
        return process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;
    }
}
