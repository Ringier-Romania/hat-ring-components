import React from 'react';
import {StoryRelatedContentParams} from "./types";
import {WidgetHelper_getWidgetCssClasses, WidgetHelper_renderEmptyWidget} from "../../../../helpers/WidgetHelper";
import {StoryRelatedContent_getData} from "./StoryRelatedContentGetData";
import {Header, Items} from "../../Lists/GenericList/generalParts";
import {GenericListWidgetConfig} from "../../Lists/GenericList/types";
import styles from "../../../../../styles/widgets/Lists/GenericList.module.scss";
import _ from "lodash";

export async function StoryRelatedContent({widgetConfig, context}: StoryRelatedContentParams) {

    const data = await StoryRelatedContent_getData(context, widgetConfig);
    const ifStoriesExists = _.get(data,'data.stories.edges',[]).length > 0;
    if(!ifStoriesExists){
        return WidgetHelper_renderEmptyWidget(widgetConfig);
    }
    let cssModules = styles.GenericList;
    return <div className={WidgetHelper_getWidgetCssClasses('StoryRelatedContent', widgetConfig, context,[cssModules])}>
        <Header widgetConfig={widgetConfig as GenericListWidgetConfig} context={context} response={data} />
        <Items widgetConfig={widgetConfig as GenericListWidgetConfig} context={context} response={data} extendableAttributes={{}} />
    </div>;
}

