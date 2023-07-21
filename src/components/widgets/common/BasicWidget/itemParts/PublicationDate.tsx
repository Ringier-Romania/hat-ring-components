import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {DateHelper_convertDate} from "../../../../../helpers/DateHelper";

export default async function PublicationDate(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const dateFromData = data.creationTime || data.originalContent?.creationTime;

    if (!dateFromData) {
        return WidgetHelper_renderEmptyComponent('PublicationDate');
    }

    const displayDate = await DateHelper_convertDate(context, dateFromData);

    return (
        <div className={['PublicationDate'].join(' ')}>
            <time dateTime={dateFromData}>
                {displayDate}
            </time>
        </div>
    )
}


PublicationDate.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment PublicationDateFragment on SectionItem {
            creationTime
            originalContent {
                ... on Story {
                    date {
                        creationTime
                    }
                }
            }
        }`
    }
}

