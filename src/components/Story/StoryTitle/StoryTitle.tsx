import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

export interface StoryTitleResponse {
    data: { story: { name: string } }
}

export interface StoryTitleParams extends ComponentParams {
    widgetConfig: {
        response?: StoryTitleResponse
    }
}

export async function StoryTitle(params: StoryTitleParams) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                name
            }
        }
    `;

    const variables = {
        storyId: params.context.id,
    };

    let response = params.widgetConfig?.response;
    if(!response){
        response = await WebsiteApiProvider.call(query, variables) as StoryTitleResponse;
    }
    const title = _.get(response, 'data.story.name');
    return <h1>{title}</h1>;
}

