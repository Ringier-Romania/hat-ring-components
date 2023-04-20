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
    let {selector} = widgetConfig;
    const res = await fetch(widgetConfig.controllerUrl);
    let html = await res.text();

    if (widgetConfig.blockName) {
        selector = `[name="${widgetConfig.blockName}"]`;
    }
    if (selector) {
        const $ = cheerio.load(html);
        html = $(selector).html();
    }

    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig)} dangerouslySetInnerHTML={{__html: html}}/>;
}
