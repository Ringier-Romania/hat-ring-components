import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import {DocumentNode} from "graphql/language/ast";
import {
    CacheHelper_get,
    CacheHelper_set, CacheHelper_runCallbackIfTimeStampHasExpired
} from "../helpers/CacheHelper";
import {MonitoringProvider} from "./MonitoringProvider";

export class WebsiteApiProvider {

    static async call(query: DocumentNode, variables, cacheTtl: null | number = null) {

        const cacheKey = {query: query.loc?.source.body, variables};
        const cacheKeyString = JSON.stringify(cacheKey);
        let cachedResponse = await CacheHelper_get(cacheKey);
        try {
            if (cachedResponse) {
                //console.log('cachedResponse');
                MonitoringProvider.counter('info.WebsitesApiProvider.call.cachedResponse');
                CacheHelper_runCallbackIfTimeStampHasExpired(cacheKey, async () => {
                    //console.log('Cache expired, calling api');
                    if (!global.HATCacheInCallInProgress) {
                        global.HATCacheInCallInProgress = {};
                        //console.log('global.HATCacheInCallInProgress initialized');
                    }
                    // if (global.HATCacheInCallInProgress[cacheKeyString]) {
                    //     // console.log('during calling api') ;
                    //     return false;
                    // }
                    global.HATCacheInCallInProgress[cacheKeyString] = 1;
                    const response = await this._call(query, variables);
                    CacheHelper_set(cacheKey, response, cacheTtl);
                    delete global.HATCacheInCallInProgress[cacheKeyString];
                });
                if (cachedResponse && typeof cachedResponse === 'object') {
                    cachedResponse["isCachedByHat"] = true;
                }

                return cachedResponse;
            }

            //console.log('non cached', variables);
            MonitoringProvider.counter('info.WebsitesApiProvider.call.nonCachedResponse');
            const response = await this._call(query, variables);
            CacheHelper_set(cacheKey, response, cacheTtl);
            if (response && typeof response === 'object') {
                response["isCachedByHat"] = false;
            }
            return response;
        } catch (e) {
            if(global.HATCacheInCallInProgress){
                delete global.HATCacheInCallInProgress[cacheKeyString];
            }

            MonitoringProvider.counter('error.WebsitesApiProvider.call.catch');
            console.error(query.loc?.source.body, variables, e);
            return null;
        }

    }


    static async _call(query: DocumentNode, variables, fetchPolicy = 'no-cache'): Promise<any> {
        //console.log('call', JSON.stringify(query.loc?.source.body).replace(/\s/g, ''), variables);
       // console.log('call');
        const accessKey = process.env.WEBSITE_API_PUBLIC!;
        const secretKey = process.env.WEBSITE_API_SECRET!;
        const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

        if (!global.websitesApiApolloClient) {
            global.websitesApiApolloClient = new WebsitesApiClientBuilder({
                accessKey,
                secretKey,
                spaceUuid
            }).buildApolloClient();
        }

        const currentTime = new Date().getTime();
        const timer = MonitoringProvider.timer(
            `info.WebsitesApiProvider.call.hitApiTimer`
        );
        const response = await global.websitesApiApolloClient.query({
            query,
            variables,
            fetchPolicy
        });
        if (timer) {
            timer.done();
        }
        const timeDifference = new Date().getTime() - currentTime;
        if (timeDifference > 4000) {
            console.log('Websites Api long query ', query.loc?.source.body, variables);
        }
        MonitoringProvider.gauge('info.WebsitesApiProvider.call.hitApiTime', timeDifference);
        return response;

    }
}
