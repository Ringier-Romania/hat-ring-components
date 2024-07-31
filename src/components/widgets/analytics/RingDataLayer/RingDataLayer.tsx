import React from "react";
import {SiteContentType, WidgetParams} from "../../../../types/types";

export async function RingDataLayer(
    {widgetConfig, context}: WidgetParams
) {

    return <>
        <script>{`
        if(typeof ringDataLayer === "undefined"){
            ringDataLayer = {};
        }
        ringDataLayer = Object.assign(ringDataLayer, ${JSON.stringify(context.hatControllerParams?.ringDataLayer || {})})`}</script>
    </>;
}
