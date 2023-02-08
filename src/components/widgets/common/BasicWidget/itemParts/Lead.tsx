import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import * as _ from "lodash";

export default function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if (!data.lead) {
        return <div className={'Lead'} style={{display: 'none'}}/>
    }

    return (
        <div className={['Lead'].join(' ')}>
                <span>{data.lead}</span>
        </div>
    )
}

