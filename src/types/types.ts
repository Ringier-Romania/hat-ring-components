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
    readonly widgetConfig: Readonly<AbstractWidgetConfig>,
}


export interface AbstractWidgetConfig {
    readonly module?: string,
    readonly widgetType?: string,
    readonly platformDesktop?: boolean,
    readonly platformMobile?: boolean,
    readonly customClass?: string,
    readonly customPosition?: 'none' | 'left' | 'center' | 'right',
    readonly customWidth?: 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
}


