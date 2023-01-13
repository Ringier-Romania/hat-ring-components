import React from "react";

export interface ParagraphBlockParams {
    blockData: {
        type: string;
        text: string;
    }
}

export default function ParagraphBlock({blockData}: ParagraphBlockParams) {
    return <div className="paragraphBlock">
        <p>{blockData.text}</p>
    </div>
}