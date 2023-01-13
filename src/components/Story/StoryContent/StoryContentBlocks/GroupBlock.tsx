import React from "react";
import {StoryContentSwitcher} from "../StoryContentSwitcher";

export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[]
}

export default function GroupBlock({blockData}) {
    console.log('groupBlock', blockData.elements)

    return <section className={`groupBlock align-${blockData.alignment} ${blockData.name}`}>
        {/* @ts-expect-error Server Component */}
        <StoryContentSwitcher content={blockData.elements} />
    </section>
}