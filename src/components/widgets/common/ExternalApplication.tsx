import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
import {getWidgetCssClasses} from "../../../helpers";

interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: ExternalApplicationConfig
}
interface ExternalApplicationConfig extends AbstractWidgetConfig {
    controllerUrl: string,
};

export async function ExternalApplication({widgetConfig, context}: ExternalApplicationParams) {
    const res = await fetch(widgetConfig.controllerUrl);
    const html = await res.text();

    return <div className={getWidgetCssClasses(widgetConfig)} dangerouslySetInnerHTML={{__html: html}}/>;
}
