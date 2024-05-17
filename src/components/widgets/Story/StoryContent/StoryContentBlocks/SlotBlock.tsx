import {Term} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import _ from "lodash";
import React from "react";
export interface SlotBlockParams {
    blockData: {
        "type": string,
        "data": any,
        "kind": Term,
        "__typename": string
    },
    context: any
}

const getSlot = (name:string) => {
    switch(name) {
        case "comparison_widget":
            return "Pvg";
        default:
            return '';
    }
}

export default function SlotBlock({blockData, context}: SlotBlockParams) {
    const availableSlots = context.customData.slots;
    const slotName = getSlot(blockData.kind.code)
    const Component = availableSlots[slotName];
    
    return <>
        {Component && <Component blockData={blockData} context={context}/>}
    </>
}
