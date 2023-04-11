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
    return <div className="OrderedListBlock">
        <ol>
            {
                blockData.entries.map(entry => <li dangerouslySetInnerHTML={{ __html: entry }}/>)
            }
        </ol>
    </div>
}
