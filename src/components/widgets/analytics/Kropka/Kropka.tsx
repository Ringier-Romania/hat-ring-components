import React from "react";
import Script from 'next/script'
import {KropkaParams} from "./types";
import {UtilsHelper_isMobile} from "../../../../helpers/UtilsHelper";
import {SiteContentType} from "../../../../types/types";
import get from "lodash/get";

export async function Kropka(
    {widgetConfig, context}: KropkaParams
) {


    let dlApi:any = {
        async: 1,
        cookieInfo: '',
        no_gemius: 1,
        adsNoBanner: 1,
        noDfp: 1,
        mobile: `${UtilsHelper_isMobile(context)}`,
        target: `${widgetConfig.target}`,
        tid: `${widgetConfig.tid}`,
        DV: `${widgetConfig.dv}`,
        kropka: {
            PU: context.id
        }
    };


    return <>
        <Script strategy={"beforeInteractive"}>
            {`if ("undefined" === typeof dlApi) { dlApi = ${JSON.stringify(dlApi)}; }else{ dlApi = Object.assign(dlApi, ${JSON.stringify(dlApi)}) }`}
        </Script>
        <Script strategy={"beforeInteractive"} src="https://lib.onet.pl/s.csr/build/dlApi/dl.boot.min.js"
                async></Script>
    </>;
}
