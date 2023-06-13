import React from 'react';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryDateParams, StoryDateResponse} from "./types";
import dayjs from "dayjs";
import {Configs_getConfig} from "../../../configs/GetConfig";

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
    const generalSettings = await Configs_getConfig(context,'general');
    const destinationLanguage = widgetConfig.language || (generalSettings.language ?  generalSettings.language : 'en');

    // console.log(destinationLanguage);
    require('dayjs/locale/en');
    require('dayjs/locale/pl');
    require('dayjs/locale/de');
    require('dayjs/locale/fr');

    let displayDate = date;
    if (widgetConfig.dateFormat) {
        displayDate = dayjs(date).locale(destinationLanguage).format(widgetConfig.dateFormat);
    }else{
        const dateSettings = await Configs_getConfig(context,'dateFormat');
        if(dateSettings){

        }
        console.log(dateSettings);
    }

    return <div className={['StoryDate'].join(' ')}>
        <time dateTime={date}>{displayDate}</time>
    </div>
}

