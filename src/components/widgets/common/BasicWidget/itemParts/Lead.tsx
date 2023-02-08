import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import * as _ from "lodash";
import {renderEmptyComponent} from "../../../../../helpers";

export default function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if (!data.lead) {
        return renderEmptyComponent('Lead');
    }

    return (
        <div className={['Lead'].join(' ')}>
                <span>{data.lead}</span>
        </div>
    )
}

