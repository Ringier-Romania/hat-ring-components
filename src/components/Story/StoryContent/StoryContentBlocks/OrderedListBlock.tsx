import React from "react";

export interface OrderedListBlockParams {
    blockData: {
        type: string;
        entries: string[];
        indentLevel: number;
        styleType: string;
        startValue: number;
    }
}

export default function OrderedListBlock({blockData}: OrderedListBlockParams) {
    return <div className="orderedListBlock">
        <ol>
            {
                blockData.entries.map(entry => <li>{entry}</li>)
            }
        </ol>
    </div>
}