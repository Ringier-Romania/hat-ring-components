import React from "react";

export interface UnorderedListBlockParams {
    blockData: {
        type: string;
        entries: string[];
        indentLevel: number;
        styleType: string;
    }
}

export default function UnorderedListBlock({blockData}: UnorderedListBlockParams) {
    return <div className="UnorderedListBlock">
        <ul>
            {
             blockData.entries.map((entry, index) => <li key={index} dangerouslySetInnerHTML={{ __html: entry }}/>)
            }
        </ul>
    </div>
}
