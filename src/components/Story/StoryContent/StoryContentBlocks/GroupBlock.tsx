import React from "react";
import {StoryContentSwitcher} from "../StoryContentSwitcher";
import {AppContext} from "../../../../types/types";

export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[];
    config: {
        width: number;
        height: number;
    }
    context: AppContext;
}

export default function GroupBlock({blockData, config, context}) {

    return <section className={`GroupBlock align${blockData.alignment} ${blockData.name}`}>
        {/* @ts-expect-error Server Component */}
        <StoryContentSwitcher content={blockData.elements} config={config} context={context}/>
    </section>
}