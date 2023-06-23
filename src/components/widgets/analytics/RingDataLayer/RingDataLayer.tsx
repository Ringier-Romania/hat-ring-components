import React from "react";
import Script from 'next/script'
import {SiteContentType, WidgetParams} from "../../../../types/types";
import get from "lodash/get";

export async function RingDataLayer(
    {widgetConfig, context}: WidgetParams
) {

    let ringDataLayer: any = {
        "context": {},
        "content": {
            "source": {"system": "ring_content_space"}
        }
    };

    if (context.siteContentType === SiteContentType.Story) {
        const pubId = get(context, 'hatControllerParams.gqlResponse.data.site.data.content.mainPublicationPoint.id', false);
        const kind = get(context, 'hatControllerParams.gqlResponse.data.site.data.content.kind.code', 'a');
        if (pubId) {
            ringDataLayer.content.publication = {"point": {"id": pubId}};
            ringDataLayer.content.object = {"type": "story", "kind": kind, "id": context.id}
        }
    }

    return <>
        <Script strategy={"beforeInteractive"}>{`
        if(typeof ringDataLayer === "undefined"){
            ringDataLayer = {};
        }
        ringDataLayer = Object.assign(ringDataLayer, ${JSON.stringify(ringDataLayer)})`}</Script>
    </>;
}
