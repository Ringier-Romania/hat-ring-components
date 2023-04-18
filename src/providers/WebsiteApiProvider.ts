import { WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';


export class WebsiteApiProvider {

    static async call(query, variables) {
        const accessKey = process.env.WEBSITE_API_PUBLIC!;
        const secretKey = process.env.WEBSITE_API_SECRET!;
        const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

        if (!global.websitesApiApolloClient) {
            global.websitesApiApolloClient = new WebsitesApiClientBuilder({accessKey, secretKey, spaceUuid}).buildApolloClient();
        }

        return await global.websitesApiApolloClient.query({ query, variables });
    }
}
