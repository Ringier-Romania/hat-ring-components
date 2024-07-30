import React, {useEffect} from "react";
import {WidgetParams} from "@hatTypes/types";

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
//@TODO prevent multiple loadings
    return <div className="EmbeddedApplicationBlock">
        <script id="pulseembed" src="https://pulsembed.eu/pulsembed.js"/>
        <div dangerouslySetInnerHTML={{ __html: blockData.embed.html }}/>
    </div>
}
