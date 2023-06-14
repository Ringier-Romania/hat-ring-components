import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {formatISO, formatRelative, Locale} from "date-fns";
import {format, toDate} from "date-fns-tz";
import {enGB} from 'date-fns/esm/locale'
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {DateHelper_convertDate} from "../../../../../helpers/DateHelper";

export default async function ModificationDate(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const dateFromData = data.modificationTime || data.originalContent?.modificationTime;

    if (!dateFromData) {
        return WidgetHelper_renderEmptyComponent('ModificationDate');
    }

    const displayDate = await DateHelper_convertDate(context, dateFromData);

    return (
        <div className={['ModificationDate'].join(' ')}>
            <time dateTime={dateFromData}>
                {displayDate}
            </time>
        </div>
    )
}

ModificationDate.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment ModificationDateFragment on SectionItem {
            modificationTime
            originalContent {
                ... on Story {
                    date {
                        modificationTime
                    }
                }
            }
        }`
    }
}

