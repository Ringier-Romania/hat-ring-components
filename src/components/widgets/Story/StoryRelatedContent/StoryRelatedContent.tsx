import React from 'react';
import {StoryRelatedContentParams} from "./types";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {StoryRelatedContent_getData} from "./StoryRelatedContentGetData";
import {Items} from "../../Lists/GenericList/generalParts";
import {GenericListWidgetConfig} from "../../Lists/GenericList/types";

export async function StoryRelatedContent({widgetConfig, context}: StoryRelatedContentParams) {

    const data = await StoryRelatedContent_getData(context, widgetConfig);

    return <div className={WidgetHelper_getWidgetCssClasses('StoryRelatedContent', widgetConfig, context)}>
        <Items widgetConfig={widgetConfig as GenericListWidgetConfig} context={context} response={data} extendableAttributes={{}} />
    </div>;
}

