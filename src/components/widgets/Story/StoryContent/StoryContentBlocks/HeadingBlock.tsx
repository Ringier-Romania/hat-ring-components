import React from "react";

export interface HeadingBlockParams {
    blockData: {
        type: string;
        text: string;
        level: number;
    }
}

export default function HeadingBlock({blockData}: HeadingBlockParams) {
    const HeadingTag = 'h' + blockData.level;

    return <div className="HeadingBlock">
        {/*@ts-ignore*/}
        <HeadingTag>{blockData.text}</HeadingTag>
    </div>
}