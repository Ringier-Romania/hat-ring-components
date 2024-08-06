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
        let cachedResponse = CacheHelper_get(cacheKey);

        try {
            if (cachedResponse) {
                MonitoringProvider.counter('info.WebsitesApiProvider.call.cachedResponse');
                CacheHelper_runCallbackIfTimeStampHasExpired(cacheKey, async () => {
                    MonitoringProvider.counter('info.WebsitesApiProvider.call.hitApi');
                    CacheHelper_set(cacheKey, this._call(query, variables), cacheTtl);
                });
                return cachedResponse;
            }

            //console.log('call ', query.loc?.source.body, variables);
            MonitoringProvider.counter('info.WebsitesApiProvider.call.nonCachedResponse');
            MonitoringProvider.counter('info.WebsitesApiProvider.call.hitApi');

            const response = await this._call(query, variables);
            CacheHelper_set(cacheKey, response, cacheTtl);

            return response;
        } catch (e) {
            console.error(query.loc?.source.body, variables, e);
            return null;
        }

    }


    static async _call(query: DocumentNode, variables, fetchPolicy = 'no-cache'): Promise<any> {
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
        const response = await global.websitesApiApolloClient.query({
            query,
            variables,
            fetchPolicy
        });
        const timeDifference = new Date().getTime() - currentTime;
        MonitoringProvider.gauge('info.WebsitesApiProvider.call.hitApiTime',timeDifference);
        return response;

    }
}
