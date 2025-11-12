declare module '*.scss';
declare module '*.astro' {
    const Component: any;
    export default Component;
    const getFragment: any;
    export { getFragment };
}

interface Global extends NodeJS.Global {
    websiteManagerConfigs(websiteManagerConfigs: any);
    lastHATCacheClean: any;
    HATcache: any;
    websitesApiApolloClient?: ApolloClient<NormalizedCacheObject>;
    websitesApiGotClient?: RingGqlApiClient;
    HATCacheInCallInProgress?: Array<Promise<any>>;
}
declare var global: Global;
