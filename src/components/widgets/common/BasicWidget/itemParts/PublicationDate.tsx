import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {formatISO, formatRelative, Locale} from "date-fns";
import {format, toDate} from "date-fns-tz";
import {enGB} from 'date-fns/esm/locale'
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
export default function PublicationDate(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const dateFromData = data.creationTime || data.originalContent?.creationTime;

    if (!dateFromData) {
        return WidgetHelper.renderEmptyComponent('PublicationDate');
    }

    const decoratedLocale = {
        ...enGB, // @todo: get value from global config
        formatRelative: (...args) => {
            if (args && args[0] === 'other') {
                return 'LLLL d. yyyy, h:mm:ss a'; // @todo: get value from global config
            }
            // @ts-ignore
            return enGB.formatRelative(...args);
        },
    };

    const options = {
        locale: decoratedLocale,
        timeZone: 'Europe/London' // @todo: get value from global config
    };

    const date = toDate(dateFromData, options);
    const relativeDate = formatRelative(date, new Date(), options);

    return (
        <div className={['PublicationDate'].join(' ')}>
            <time dateTime={formatISO(date)}>
                {relativeDate}
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

