import React, {ComponentState} from "react";

export enum SiteContentType {
    Author = "Author",
    CustomAction = 'CustomAction',
    SiteNode = 'SiteNode',
    Source = 'Source',
    Story = 'Story',
    Topic = 'Topic',
}

export interface AppContext {
    siteContentType: SiteContentType | undefined | null,
    id: string | undefined | null,
    url: string,
    customData: any,
    hatControllerParams: any
}

export interface ComponentParams {
    context: AppContext,
    config: any
}


export interface AbstractWidget extends React.ComponentClass<WidgetParams> {

}

export interface WidgetParams {
    context: AppContext,
    widgetConfig: any,
}


export interface AbstractWidgetConfig{
    module: string,
    widgetType: string,
    platformDesktop: boolean,
    platformMobile: boolean,
    customClass: string,
    customPosition: string,
    customWidth: string
}


