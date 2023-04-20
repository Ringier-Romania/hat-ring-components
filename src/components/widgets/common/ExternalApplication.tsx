"use server";
import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
import {WidgetHelper} from "../../../helpers/WidgetHelper";
const cheerio = require('cheerio');

interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: ExternalApplicationConfig
}
interface ExternalApplicationConfig extends AbstractWidgetConfig {
    controllerUrl: string,
    blockName?: string,
    selector?: string
};

export async function ExternalApplication({widgetConfig, context}: ExternalApplicationParams) {
    const _widgetConfig = {...widgetConfig};
    const res = await fetch(_widgetConfig.controllerUrl);
    let html = await res.text();

    if (_widgetConfig.blockName) {
        _widgetConfig.selector = `[name="${_widgetConfig.blockName}"]`;
    }
    if (_widgetConfig.selector) {
        const $ = cheerio.load(html);
        html = $(_widgetConfig.selector).html();
    }

    return <div className={WidgetHelper.getWidgetCssClasses(_widgetConfig)} dangerouslySetInnerHTML={{__html: html}}/>;
}
