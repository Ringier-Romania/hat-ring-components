import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {formatISO, formatRelative, Locale} from "date-fns";
import {format, toDate} from "date-fns-tz";
import {enGB} from 'date-fns/esm/locale'
import {renderEmptyComponent} from "../../../../../helpers";
export default function PublicationDate(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const dateFromData = data.creationTime || data.originalContent.creationTime;

    if (!dateFromData) {
        return renderEmptyComponent('PublicationDate');
    }

    const decoratedLocale = {
        ...enGB, // @todo: pobrać wartość z globalnej konfiguracji
        formatRelative: (...args) => {
            if (args && args[0] === 'other') {
                return 'LLLL d. yyyy, h:mm:ss a'; // @todo: pobrać wartość z globalnej konfiguracji
            }
            // @ts-ignore
            return enGB.formatRelative(...args);
        },
    };

    const options = {
        locale: decoratedLocale,
        timeZone: 'Europe/London' // @todo: pobrać wartość z globalnej konfiguracji
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

