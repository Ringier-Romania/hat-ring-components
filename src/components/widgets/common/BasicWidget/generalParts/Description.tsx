import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";

export default function Description(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {

    const descText = widgetConfig.description;

    if (!descText) {
        return WidgetHelper.renderEmptyComponent('Description');
    }

    return (
        <div className={['Description'].join(' ')}>
            <p>
                {descText}
            </p>
        </div>
    )
}

