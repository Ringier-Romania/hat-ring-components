'use client';

import React, {useEffect} from "react";
import Script from "next/script";
import {WidgetParams} from "../../../../../types/types";

export interface EmbeddedApplicationBlockParams extends WidgetParams {
    blockData: {
        type: string;
        embed: {
            html: string;
        }
    }
}
export default function EmbeddedApplicationBlock({blockData, context}: EmbeddedApplicationBlockParams) {

    useEffect(()=>{
        //@ts-ignore
        if(window.pulsembed){
            //@ts-ignore
            window.pulsembed();
        }
    },[]);

    return <div className="EmbeddedApplicationBlock">
        <Script id="pulseembed" src="https://pulsembed.eu/pulsembed.js" strategy="lazyOnload"/>
        <div dangerouslySetInnerHTML={{ __html: blockData.embed.html }}/>
    </div>
}
