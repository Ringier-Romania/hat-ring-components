import {WebsitesApiClient} from "@ringpublishing/graphql-api-client-got";

declare module '*.scss';

interface Global extends NodeJS.Global {
    websiteManagerConfigs(websiteManagerConfigs: any);
    lastHATCacheClean: any;
    HATcache: any;
    websitesApiApolloClient?: ApolloClient<NormalizedCacheObject>;
    websitesApiGotClient?: WebsitesApiClient;
}
declare var global: Global;
