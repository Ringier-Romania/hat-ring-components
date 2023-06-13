import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
import {WidgetHelper_getWidgetCssClasses} from "../../../helpers/WidgetHelper";


interface HtmlInsertParams extends WidgetParams {
    widgetConfig: HtmlInsertConfig
}
interface HtmlInsertConfig extends AbstractWidgetConfig {
    plainHtml: string
};

export function HtmlInsert({widgetConfig, context}: HtmlInsertParams) {
    return <div className={WidgetHelper_getWidgetCssClasses(widgetConfig, context)} dangerouslySetInnerHTML={{__html: widgetConfig.plainHtml}}/>;
}
