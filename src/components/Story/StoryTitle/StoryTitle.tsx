import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

export interface StoryTitleParams extends ComponentParams {
    config: {}
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

    const response = await WebsiteApiProvider.call(query, variables);
    const title = _.get(response, 'data.story.name');
    return <h1>{title}</h1>;
}

