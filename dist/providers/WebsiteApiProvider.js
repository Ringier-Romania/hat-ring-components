"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteApiProvider = void 0;
const graphql_api_client_1 = require("@ringpublishing/graphql-api-client");
class WebsiteApiProvider {
    static async call(query, variables) {
        const accessKey = process.env.WEBSITE_API_PUBLIC;
        const secretKey = process.env.WEBSITE_API_SECRET;
        const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID;
        if (!global.websitesApiApolloClient) {
            global.websitesApiApolloClient = new graphql_api_client_1.WebsitesApiClientBuilder({ accessKey, secretKey, spaceUuid }).buildApolloClient();
        }
        return await global.websitesApiApolloClient.query({ query, variables });
    }
}
exports.WebsiteApiProvider = WebsiteApiProvider;
//# sourceMappingURL=WebsiteApiProvider.js.map