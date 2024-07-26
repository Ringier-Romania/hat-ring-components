import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "@hatTypes/types";
import {WidgetHelper_getWidgetCssClasses} from "@hatRingHelpers/WidgetHelper";


interface HtmlInsertParams extends WidgetParams {
    widgetConfig: HtmlInsertConfig
}
interface HtmlInsertConfig extends AbstractWidgetConfig {
    plainHtml: string
};

export function HtmlInsert({widgetConfig, context}: HtmlInsertParams) {
    return <div suppressHydrationWarning={true} className={WidgetHelper_getWidgetCssClasses('HtmlInsert', widgetConfig, context)} dangerouslySetInnerHTML={{__html: widgetConfig.plainHtml}}/>;
}
