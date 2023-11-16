declare module '*.scss';

interface Global extends NodeJS.Global {
    lastHATCacheClean: any;
    HATcache: any;
    websitesApiApolloClient?: ApolloClient<NormalizedCacheObject>;
}
declare var global: Global;
