import React from "react";
import * as _ from "lodash";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";


interface HtmlInsertParams extends WidgetParams {
    widgetConfig: {
        plainHtml: string
    }
}

export function HtmlInsert({widgetConfig, context}: HtmlInsertParams) {
    return <div dangerouslySetInnerHTML={{__html: widgetConfig.plainHtml}}/>;
}
