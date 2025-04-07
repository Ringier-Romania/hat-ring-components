import {UtilsHelper_convertToInt} from "./UtilsHelper";

import {RedisCacheAdapter} from "../adapters/cache/RedisCacheAdapter";
import {CacheAdapterInterface} from "../adapters/cache/types";
import {NodeCacheAdapter} from "../adapters/cache/NodeCacheAdapter";
import {MonitoringProvider} from "../providers/MonitoringProvider";

const stdTTL = process.env.CACHE_TTL ? UtilsHelper_convertToInt(process.env.CACHE_TTL) : 60;

let cacheAdapter: CacheAdapterInterface = new NodeCacheAdapter();
if (process.env.USE_REDIS == '1') {
    cacheAdapter = new RedisCacheAdapter();
}

export function CacheHelper_getCacheAdapter() {
    return cacheAdapter;
}

export async function CacheHelper_set(key: any, value: any, TTL: null | number | undefined = null, tags: string[] | null | boolean = null) {
    if (process.env.CACHE_TTL === '0' && !TTL) {
        return;
    }

    if (TTL === 0) {
        return;
    }

    const ttl = TTL || stdTTL;
    key = JSON.stringify(key);
    await cacheAdapter.set(key, value, ttl, tags);
}

export async function CacheHelper_get(key: any, removeOnExpire = false) {
    key = JSON.stringify(key);
    const value = await cacheAdapter.get(key);
    if (removeOnExpire) {
        const ttl = await cacheAdapter.getTtl(key);
        if (!ttl) {
            return value;
        }
        // @ts-ignore
        const expired = ttl ? ttl - new Date().getTime() < 0 : true;
        if (expired) {
            await cacheAdapter.del(key);
        }
    }
    handleCleanCache();
    return value;
}

export async function CacheHelper_runCallbackIfTimeStampHasExpired(key: any, callback: Function) {
    key = JSON.stringify(key);
    const ttl = await cacheAdapter.getTtl(key);
    if (!ttl) {
        callback();
        return;
    }
    const expired = ttl ? ttl - new Date().getTime() < 0 : true;
    if (expired) {
        callback();
    }
}

export async function CacheHelper_flush() {
    return await cacheAdapter.flushAll();
}

export async function CacheHelper_clearByPartialKeyByGlob(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false, allKeys?: Array<string>) {
    MonitoringProvider.counter('info.CacheHelper_clearByPartialKey.run');
    let keys: Array<string> = allKeys ? allKeys : await cacheAdapter.keysByGlob('*');
    MonitoringProvider.gauge('info.CacheHelper_clearByPartialKey.totalKeys', keys.length);

    let values: any = {};

    if (searchInValue) {
        values = await cacheAdapter.mget(keys);
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
                    cacheAdapter.del(key);
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                cacheAdapter.del(key);
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        cacheAdapter.del(key);
                        deleteCount.responses++;
                    }
                } else {
                    cacheAdapter.del(key);
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export async function CacheHelper_clearByPartialKey(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false, allKeys?: Array<string>) {
    MonitoringProvider.counter('info.CacheHelper_clearByPartialKey.run');
    let keys: Array<string> = allKeys ? allKeys : await cacheAdapter.keys();
    MonitoringProvider.gauge('info.CacheHelper_clearByPartialKey.totalKeys', keys.length);

    let values: any = {};

    if (searchInValue) {
        values = await cacheAdapter.mget(keys);
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
                    cacheAdapter.del(key);
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                cacheAdapter.del(key);
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        cacheAdapter.del(key);
                        deleteCount.responses++;
                    }
                } else {
                    cacheAdapter.del(key);
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export async function CacheHelper_clearByPartialKeyWithOutDel(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false, allKeys?: Array<string>) {
    MonitoringProvider.counter('info.CacheHelper_clearByPartialKey.run');
    let keys: Array<string> = allKeys ? allKeys : await cacheAdapter.keys();
    MonitoringProvider.gauge('info.CacheHelper_clearByPartialKey.totalKeys', keys.length);

    let values: any = {};

    if (searchInValue) {
        values = await cacheAdapter.mget(keys);
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
                    // cacheAdapter.del(key);
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                // cacheAdapter.del(key);
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        // cacheAdapter.del(key);
                        deleteCount.responses++;
                    }
                } else {
                    // cacheAdapter.del(key);
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export async function CacheHelper_clearByPartialKeyUnlink(partialKey: Array<any>, notInPartialKey: Array<any> = [], searchInValue = false, allKeys?: Array<string>) {
    MonitoringProvider.counter('info.CacheHelper_clearByPartialKey.run');
    let keys: Array<string> = allKeys ? allKeys : await cacheAdapter.keys();
    MonitoringProvider.gauge('info.CacheHelper_clearByPartialKey.totalKeys', keys.length);

    let values: any = {};

    if (searchInValue) {
        values = await cacheAdapter.mget(keys);
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
                    if (cacheAdapter.unlink) {
                        cacheAdapter.unlink(key);
                    } else {
                        cacheAdapter.del(key);
                    }
                    deleteCount.keys++;
                    deleted = true;
                }
            } else {
                if (cacheAdapter.unlink) {
                    cacheAdapter.unlink(key);
                } else {
                    cacheAdapter.del(key);
                }
                deleteCount.keys++;
                deleted = true;
            }
        }

        if (searchInValue && !deleted) {
            const value = JSON.stringify(values[key]);
            if (partialKey.every((partKey) => value.includes(partKey))) {
                if (notInPartialKey.length > 0) {
                    if (!notInPartialKey.every((partKey) => value.includes(partKey))) {
                        if (cacheAdapter.unlink) {
                            cacheAdapter.unlink(key);
                        } else {
                            cacheAdapter.del(key);
                        }
                        deleteCount.responses++;
                    }
                } else {
                    if (cacheAdapter.unlink) {
                        cacheAdapter.unlink(key);
                    } else {
                        cacheAdapter.del(key);
                    }
                    deleteCount.responses++;
                }
            }
        }
    });
    handleCleanCache()
    return deleteCount;
}

export function CacheHelper_del(keys: any) {
    return cacheAdapter.del(keys);
}

export function CacheHelper_keys() {
    return cacheAdapter.keys();
}


export async function CacheHelper_getKeysByTag(tag: string) {
    if(!cacheAdapter.getKeysByTag) {
        console.error('CacheAdapter does not support getKeysByTag');
        return false;
    }
    return await cacheAdapter.getKeysByTag(tag);
}


export async function CacheHelper_clearByTag(tag: string): Promise<{ keys: number, responses: number } > {
    const keys = await CacheHelper_getKeysByTag(tag);


    const deleteCount = {
        keys: 0,
        responses: 0,
    }
    if (!keys) {
        return deleteCount;
    }

    keys.forEach((key) => {
        cacheAdapter.del(key);
        deleteCount.keys++;
    });

    if(cacheAdapter.removeTag) {
        await cacheAdapter.removeTag(tag);
    }

    return deleteCount;
}



export function CacheHelper_keysByGlob(globKey) {
    if (cacheAdapter.keysByGlob) {
        return cacheAdapter.keysByGlob(globKey);
    }
    return cacheAdapter.keys();
}

export function CacheHelper_createParentChildRelation(parentId, childrenIds) {
    const getingKeysMode = process.env.GET_KEYS_MODE || 'tags'; //keys
    switch (getingKeysMode) {
        case 'tags':
            childrenIds.forEach((childrenId) => {
                if (childrenId && cacheAdapter.addTag) {
                    cacheAdapter.addTag(`story_${childrenId}`, `parent_${parentId}`);
                } else if(childrenId) { 
                    CacheHelper_set(`parent_${parentId}_child_${childrenId}`, '');
                }
            })
            break;
        case 'keys':
            childrenIds.forEach((childrenId) => {
                if (childrenId) {
                    CacheHelper_set(`parent_${parentId}_child_${childrenId}`, '');
                }
            })
            break;
    }
}

function handleCleanCache() {
    const currentTime = new Date().getTime();
    if (!global.lastHATCacheClean) {
        global.lastHATCacheClean = currentTime;
    }

    const TTL = process.env.CACHE_CLEAN_INTERVAL ? UtilsHelper_convertToInt(process.env.CACHE_CLEAN_INTERVAL) : 60;
    if (currentTime - global.lastHATCacheClean > (TTL * 1000)) {
        global.HATCacheInCallInProgress = {};
        MonitoringProvider.counter('info.CacheHelper_handleCleanCache.CacheHelper_flush');
        CacheHelper_flush();
        global.lastHATCacheClean = currentTime;
    }
}
