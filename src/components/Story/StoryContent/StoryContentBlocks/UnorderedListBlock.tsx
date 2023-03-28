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
             blockData.entries.map(entry => <li dangerouslySetInnerHTML={{ __html: entry }}/>)
            }
        </ul>
    </div>
}
