import React from "react";

export interface PreformattedBlockParams {
    blockData: {
        type: string;
        text: string;
    }
}

export default function PreformattedBlock({blockData}: PreformattedBlockParams) {
    return <div className="PreformattedBlock">
        <pre>{blockData.text}</pre>
    </div>
}