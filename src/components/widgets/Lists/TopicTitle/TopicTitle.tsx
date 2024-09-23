import React from 'react';
import _ from 'lodash';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {TopicTitleParams, TopicTitleResponse} from "./types";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";

export async function TopicTitle({widgetConfig, context}: TopicTitleParams) {
    const query = gql`
        query($id: UUID){
            topic(id: $id){
                name
            }
        }
    `;

    const categoryId = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id')|| _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.id');

    const variables = {
        id: categoryId,
    };

    let response = widgetConfig?.response;
    if (!response) {
        response = await WebsiteApiProvider.call(query, variables) as TopicTitleResponse;
    }
    const title = _.get(response, 'data.topic.name');
    return <div className={WidgetHelper_getWidgetCssClasses('TopicTitle', widgetConfig, context)}>
        <h1>{title}</h1>
    </div>;
}

