import {Term} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import React from "react";

export interface SlotBlockParams {
    blockData: {
        "type": string,
        "data": any,
        "kind": Term,
        "__typename": string
    }
}

export default function SlotBlock({blockData}: SlotBlockParams) {
    return <>{JSON.stringify(blockData)}</>
}
