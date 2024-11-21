export interface CacheAdapterInterface {
    set(key: any, value: any, TTL: null | number | undefined): Promise<void>;
    get(key: any): Promise<any>;
    del(key: any): Promise<number>;
    delKeys?(keys: Array<string>): Promise<number>;
    getTtl(key: any): Promise<number|undefined>;
    flushAll(): Promise<any>;
    keys(): Promise<string[]>;
    keysByGlob?(globKey: string): Promise<string[]>;
    mget(keys: string[]): Promise<{ [p: string]: unknown }>;
}
