import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import _ from "lodash";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";

export default function Description(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes,
        }) {

    const descText = widgetConfig.description;

    if (!descText) {
        return WidgetHelper_renderEmptyComponent('Description');
    }

    return (
        <div className={['Description'].join(' ')}>
            <p>
                {descText}
            </p>
        </div>
    )
}

