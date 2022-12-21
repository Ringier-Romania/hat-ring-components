import React from 'react';
import * as _ from 'lodash';
import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";

export interface StoryTitleParams extends ComponentParams {
    config: {}
}

export async function StoryTitle(params: StoryTitleParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                name
            }
        }
    `;
    const variables = {
        storyId: params.context.id
    };

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query, variables);

    console.log(params.context.customData);
    const title = _.get(response, 'data.story.name');
    return <h1>{title}</h1>;
}

