import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';

export class WebsiteApiProvider {

    static async call(query, variables) {
        const accessKey = process.env.WEBSITE_API_PUBLIC!;
        const secretKey = process.env.WEBSITE_API_SECRET!;
        const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

        const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
        return await websitesApiClient.query(query, variables);
    }
}