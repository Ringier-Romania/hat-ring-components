import React from 'react';
import {AppContext} from "types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import * as _ from "lodash";

export default function Title(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {


    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;

    return (
        <div className={['Title'].join(' ')}>
            {widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ?
                <HeaderTag>{data.title}</HeaderTag> :
                <span>{data.title}</span>}
        </div>
    )
}

