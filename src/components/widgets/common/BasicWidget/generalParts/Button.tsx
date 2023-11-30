import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
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
                ? <RingLink href={widgetConfig.moreUrl}>
                    {widgetConfig.moreText}
                </RingLink>
                : <button type="button">{widgetConfig.moreText}</button>
            }
        </div>
    )
}

