import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../types/types";
const cheerio = require('cheerio');

interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: {
        controllerUrl: string,
        selector?: string
    }
}

export async function ExternalApplication({widgetConfig, context}: ExternalApplicationParams) {
    const res = await fetch(widgetConfig.controllerUrl);
    let html = await res.text();

    if(widgetConfig.selector){
        const $ = cheerio.load(html);
        html = $(widgetConfig.selector).html();
    }


    return <div dangerouslySetInnerHTML={{__html: html}}/>;
}
