import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink/RingLink";

export default function Button(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes,
        }) {
    return (
        <div className={['Button'].join(' ')}>
            {widgetConfig.moreUrl
                ? <RingLink href={widgetConfig.moreUrl} title={widgetConfig.moreText}>
                    {widgetConfig.moreText}
                </RingLink>
                : <button type="button" title={widgetConfig.moreText}>{widgetConfig.moreText}</button>
            }
        </div>
    )
}

