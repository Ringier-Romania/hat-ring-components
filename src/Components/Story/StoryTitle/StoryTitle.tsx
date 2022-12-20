import React from 'react';
import * as _ from 'lodash';
import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';

export async function StoryTitle() {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

    const query = gql`
        query {
            story(id:"a491092e-52bd-4114-8a41-1fc74e5b2157"){
                name
            }
        }
    `;

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query);

    const title = _.get(response, 'data.story.name');
    return <h1>${title}</h1>;
}

