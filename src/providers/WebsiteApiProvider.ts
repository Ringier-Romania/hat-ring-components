import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import { UtilsHelper_isDevelopmentMode} from "../helpers/UtilsHelper";
import gql from "graphql-tag";
import {DocumentNode} from "graphql/language/ast";

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

        const fetchPolicy = UtilsHelper_isDevelopmentMode() ? 'no-cache' : 'cache-first';
        return await global.websitesApiApolloClient.query({query, variables, fetchPolicy});
    }
}
