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
    widgetConfig: AbstractWidgetConfig,
}


export interface AbstractWidgetConfig{
    module?: string,
    widgetType?: string,
    platformDesktop?: boolean,
    platformMobile?: boolean,
    customClass?: string,
    customPosition?: 'none' | 'left' | 'center' | 'right',
    customWidth?: 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
}


