import React from 'react';
import {AppContext} from "types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";

export default function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    return (
        <div className={['Lead'].join(' ')}>
                <span>{data.lead}</span>
        </div>
    )
}

