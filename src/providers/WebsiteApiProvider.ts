import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import {DocumentNode} from "graphql/language/ast";
import {
    CacheHelper_get,
    CacheHelper_set, CacheHelper_runCallbackIfTimeStampHasExpired
} from "../helpers/CacheHelper";

export class WebsiteApiProvider {

    static async call(query: DocumentNode, variables) {
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

        const fetchPolicy = 'no-cache';
        const cacheKey = {query: query.loc?.source.body, variables};
        let cachedResponse = CacheHelper_get(cacheKey);

        if(cachedResponse) {
            CacheHelper_runCallbackIfTimeStampHasExpired(cacheKey, async () => {
                CacheHelper_set(cacheKey, await global.websitesApiApolloClient.query({query, variables, fetchPolicy}));
            });
            return cachedResponse;
        }

        const response = await global.websitesApiApolloClient.query({query, variables, fetchPolicy});
        CacheHelper_set(cacheKey, response);
        return response;
    }
}
