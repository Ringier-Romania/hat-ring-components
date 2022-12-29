import React from "react";
import * as _ from "lodash";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";


interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: {
        controllerUrl: string,
    }
}

export async function ExternalApplication({widgetConfig, context}: ExternalApplicationParams) {
    const res = await fetch(widgetConfig.controllerUrl);
    const html = await res.text();

    return <div dangerouslySetInnerHTML={{__html: html}}/>;
}
