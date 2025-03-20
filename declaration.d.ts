
declare module '*.scss';

interface Global extends NodeJS.Global {
    websiteManagerConfigs(websiteManagerConfigs: any);
    lastHATCacheClean: any;
    HATcache: any;
    websitesApiApolloClient?: ApolloClient<NormalizedCacheObject>;,
    HATCacheInCallInProgress: any;
    HATCacheTest: any;
}
declare var global: Global;
