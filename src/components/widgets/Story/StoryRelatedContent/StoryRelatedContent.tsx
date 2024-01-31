import React from 'react';
import {StoryRelatedContentParams} from "./types";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {StoryRelatedContent_getData} from "./StoryRelatedContentGetData";
import {Header, Items} from "../../Lists/GenericList/generalParts";
import {GenericListWidgetConfig} from "../../Lists/GenericList/types";
import styles from "../../../../../styles/widgets/Lists/GenericList.module.scss";

export async function StoryRelatedContent({widgetConfig, context}: StoryRelatedContentParams) {

    const data = await StoryRelatedContent_getData(context, widgetConfig);
    let cssModules = styles.GenericList;
    return <div className={WidgetHelper_getWidgetCssClasses('StoryRelatedContent', widgetConfig, context,[cssModules])}>
        <Header widgetConfig={widgetConfig as GenericListWidgetConfig} context={context} response={data} />
        <Items widgetConfig={widgetConfig as GenericListWidgetConfig} context={context} response={data} extendableAttributes={{}} />
    </div>;
}

