import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
import {WidgetHelper} from "../../../helpers/WidgetHelper";


interface HtmlInsertParams extends WidgetParams {
    widgetConfig: HtmlInsertConfig
}
interface HtmlInsertConfig extends AbstractWidgetConfig {
    plainHtml: string
};

export function HtmlInsert({widgetConfig, context}: HtmlInsertParams) {
    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig)} dangerouslySetInnerHTML={{__html: widgetConfig.plainHtml}}/>;
}
