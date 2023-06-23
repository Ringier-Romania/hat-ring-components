import React from "react";
import Script from 'next/script'
import {KropkaParams} from "./types";
import {UtilsHelper_isMobile} from "../../../../helpers/UtilsHelper";
import {SiteContentType} from "../../../../types/types";
import get from "lodash/get";

export async function Kropka(
    {widgetConfig, context}: KropkaParams
) {

    function getPubType(kind) {
        // Map kind to pub type
        const kindMap = {
            article: 'a',
            gallery: 'g',
            video: 'v',
            poll: 'p',
            listicle: 'l',
            quiz: 'q',
            liveblog: 'lb',
            livevideo: 'lv',
        };

        if (!(kind in kindMap)) {
            return 'a';
        }
        return kindMap[kind];
    }

    let dlApi:any = {
        async: 1,
        cookieInfo: '',
        no_gemius: 1,
        adsNoBanner: 1,
        noDfp: 1,
        mobile: `${UtilsHelper_isMobile(context)}`,
        target: `${widgetConfig.target}`,
        tid: `${widgetConfig.tid}`,
        DV: `${widgetConfig.dv}`
    };

    if (context.siteContentType === SiteContentType.Story) {

        const pubId = get(context, 'hatControllerParams.gqlResponse.data.site.data.content.mainPublicationPoint.id', false);
        const kind = get(context, 'hatControllerParams.gqlResponse.data.site.data.content.kind.code', 'a');
        const pubType = getPubType(kind);
        if(pubId){
            dlApi.DX = `PV,puls,${pubId},${widgetConfig.portalId},${pubType}`;
            console.log(dlApi);
        }
    }

    return <>
        <Script strategy={"beforeInteractive"}>
            {`if ("undefined" === typeof dlApi) { dlApi = ${JSON.stringify(dlApi)}; }`}
        </Script>
        <Script strategy={"beforeInteractive"} src="https://lib.onet.pl/s.csr/build/dlApi/dl.boot.min.js"
                async></Script>
    </>;
}
