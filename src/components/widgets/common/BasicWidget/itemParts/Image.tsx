import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";

export default function Image(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {


    //@TODO resize ocdn
    return (
        data.image ?
            <div className={['Image'].join(' ')}>
                <img src={data.image.url}/>
            </div> :
            <></>

    )
}

