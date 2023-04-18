declare module '*.scss';

interface Global extends NodeJS.Global {
    websitesApiApolloClient?: ApolloClient<NormalizedCacheObject>;
}
declare var global: Global;
