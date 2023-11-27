import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import { UtilsHelper_isDevelopmentMode} from "../helpers/UtilsHelper";
import gql from "graphql-tag";
import {DocumentNode} from "graphql/language/ast";
import {CacheHelper_get, CacheHelper_set} from "../helpers/CacheHelper";

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



        const cacheKey = {query: query.loc?.source.body, variables};
        if(CacheHelper_get(cacheKey)){
            return CacheHelper_get(cacheKey);
        }
        const fetchPolicy = 'no-cache';
        const res = await global.websitesApiApolloClient.query({query, variables, fetchPolicy});
        console.log('callllll');
        console.log(query.loc?.source.body,variables);
        CacheHelper_set(cacheKey, res);
        return res;
    }
}
