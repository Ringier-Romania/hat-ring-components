import {Term} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import _ from "lodash";
import React from "react";
import {AbstractWidget} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";

export interface SlotBlockParams {
    blockData: {
        "type": string,
        "data": any,
        "kind": Term,
        "__typename": string
    },
    context: any
}


export default function SlotBlock({blockData, context}: SlotBlockParams) {
    const availableSlots = context.customData.slots;
    if (!blockData.kind || !blockData.kind.code) {
        return WidgetHelper_renderEmptyComponent('SlotBlock', 'SlotBlock: blockData.kind.code is missing', true);
    }
    const slotName = _.upperFirst(_.camelCase(blockData.kind.code));
    const Component = availableSlots[slotName];

    return <div className="SlotBlock">
        {Component && <Component blockData={blockData} context={context}/>}
    </div>
}
