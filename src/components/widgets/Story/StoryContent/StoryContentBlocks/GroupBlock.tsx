import React from "react";
import {StoryContentSwitcher} from "../StoryContentSwitcher";
import {AppContext} from "../../../../../types/types";

export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[];
    widgetConfig: {
        width: number;
        height: number;
    }
    context: AppContext;
}

export default function GroupBlock({blockData, widgetConfig, context}) {

    return <section className={`GroupBlock align${blockData.alignment} ${blockData.name}`}>
        {/* @ts-expect-error Server Component */}
        <StoryContentSwitcher content={blockData.elements} widgetConfig={widgetConfig} context={context}/>
    </section>
}
