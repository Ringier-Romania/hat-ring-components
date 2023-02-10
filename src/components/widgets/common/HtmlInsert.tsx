import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
import {getWidgetCssClasses} from "../../../helpers";


interface HtmlInsertParams extends WidgetParams {
    widgetConfig: HtmlInsertConfig
}
interface HtmlInsertConfig extends AbstractWidgetConfig {
    plainHtml: string
};

export function HtmlInsert({widgetConfig, context}: HtmlInsertParams) {
    return <div className={getWidgetCssClasses(widgetConfig)} dangerouslySetInnerHTML={{__html: widgetConfig.plainHtml}}/>;
}
