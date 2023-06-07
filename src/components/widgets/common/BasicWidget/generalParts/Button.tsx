import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";

export default function Button(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
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

