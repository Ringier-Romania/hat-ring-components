import React from 'react';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryDateParams, StoryDateResponse} from "./types";
import {DateHelper_convertDate} from "../../../../helpers/DateHelper";

export async function StoryDate({widgetConfig, context}: StoryDateParams) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                date {
                    modificationTime
                    creationTime
                }
            }
        }
    `;
    const variables = {
        storyId: context.id,
    };

    const response = await WebsiteApiProvider.call(query, variables) as StoryDateResponse;
    const date = widgetConfig.dateType == 'modificationTime' ? response.data.story.date.modificationTime || response.data.story.date.creationTime : response.data.story.date.creationTime;

    const displayDate = await DateHelper_convertDate(context, date, widgetConfig.dateFormat);

    return <div className={['StoryDate'].join(' ')}>
        <time dateTime={date}>{displayDate}</time>
    </div>
}

