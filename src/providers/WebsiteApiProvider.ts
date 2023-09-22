import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import { UtilsHelper_isDevelopmentMode} from "../helpers/UtilsHelper";
import gql from "graphql-tag";
import {DocumentNode} from "graphql/language/ast";

let lastCallTimestamps = [];
const cacheTTLMinutes = 3;

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

        function getFetchPolicy(query, variables) {
            const queryBody = query.loc?.source.body;
            if(!queryBody){
                return 'cache-first';
            }
            const cacheKey = query.loc?.source.body + JSON.stringify(variables);
            if(!lastCallTimestamps[cacheKey]){
                lastCallTimestamps[cacheKey] = Date.now();
                return 'cache-first';
            }
            const timeDiff = Date.now() - lastCallTimestamps[cacheKey];
            if (timeDiff > cacheTTLMinutes * 60 * 1000) {
                lastCallTimestamps[cacheKey] = Date.now();
                return 'network-only';
            }
            return 'cache-first';
        }

        const fetchPolicy = UtilsHelper_isDevelopmentMode() ? 'no-cache' : getFetchPolicy(query, variables);
        return await global.websitesApiApolloClient.query({query, variables, fetchPolicy});
    }
}
