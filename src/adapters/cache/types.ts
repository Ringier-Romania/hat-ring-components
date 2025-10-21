export interface CacheAdapterInterface {
    set(key: any, value: any, TTL: null | number | undefined, tags?: string[] | null | boolean): Promise<void>;
    get(key: any): Promise<any>;
    del(key: any): Promise<number>;
    unlink?(key: string): Promise<void>;
    getTtl(key: any): Promise<number|undefined>;
    getExpirationTimestamp(key: any): Promise<number|undefined>;
    flushAll(): Promise<any>;
    keys(): Promise<string[]>;
    keysByGlob?(globKey: string): Promise<string[]>;
    scan?(cursor:number, match: string, count?:number): Promise<{keys: Array<any>, cursor: number}>;
    mget(keys: string[]): Promise<{ [p: string]: unknown }>;
    getKeysByTag?(tag: string): Promise<string[]>;
    removeTag?(tag: string): Promise<void>;
    addTag?(tag: string, key:string): Promise<void>;
}
