import React from "react";
import Script from 'next/script'
import {SiteContentType, WidgetParams} from "../../../../types/types";
import get from "lodash/get";

export async function RingDataLayer(
    {widgetConfig, context}: WidgetParams
) {

    return <>
        <Script strategy={"beforeInteractive"}>{`
        if(typeof ringDataLayer === "undefined"){
            ringDataLayer = {};
        }
        ringDataLayer = Object.assign(ringDataLayer, ${JSON.stringify(context.hatControllerParams?.ringDataLayer || {})})`}</Script>
    </>;
}
