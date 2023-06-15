
import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryTitleParams, StoryTitleResponse} from "./types";

export async function StoryTitle({widgetConfig, context}: StoryTitleParams) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                title
            }
        }
    `;

    const variables = {
        storyId: context.id,
    };

    let response = widgetConfig?.response;
    if(!response){
        response = await WebsiteApiProvider.call(query, variables) as StoryTitleResponse;
    }
    const title = _.get(response, 'data.story.title');
    return <h1>{title}</h1>;
}

