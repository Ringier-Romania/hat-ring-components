import React from "react";
import {KropkaParams} from "./types";
import {UtilsHelper_isMobile} from "../../../../helpers/UtilsHelper";

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
        <script >
            {`if ("undefined" === typeof dlApi) { dlApi = ${JSON.stringify(dlApi)}; }else{ dlApi = Object.assign(dlApi, ${JSON.stringify(dlApi)}) }`}
        </script>
        <script src="https://lib.onet.pl/s.csr/build/dlApi/dl.boot.min.js"
                async></script>
    </>;
}
