'use client';

import React, {useEffect} from "react";
import Script from "next/script";

export interface Embedded_applicationBlockParams {
    blockData: {
        type: string;
        embed: {
            html: string;
        }
    }
}

export default function Embedded_applicationBlock({blockData}: Embedded_applicationBlockParams) {

    useEffect(()=>{
        //@ts-ignore
        if(window.pulsembed){
            //@ts-ignore
            window.pulsembed();
        }
    },[]);

    return <div className="embeddedApplicationBlock">
        <Script id="pulseembed" src="https://pulsembed.eu/pulsembed.js" strategy="lazyOnload"/>
        <div dangerouslySetInnerHTML={{ __html: blockData.embed.html }}/>
    </div>
}