import {AbstractWidgetConfig, AppContext, ComponentParams, WidgetParams} from "../../../../types/types";

export interface  StoryContentWidgetConfig extends AbstractWidgetConfig {
    standardImageWidth?: string | number,
    standardImageHeight?: string| number,
    displayFrom?: string| number,
    displayTo?: string | number,
}

export interface StoryContentParams extends WidgetParams {
    widgetConfig: StoryContentWidgetConfig
}

export interface StoryContentSwitcherParams {
    content: any[];
    context: AppContext;
    widgetConfig: StoryContentWidgetConfig
}


export interface ImageBlockParams {
    blockData: {
        type: string;
        title: string;
        url: string;
        alt: string;
        link: {
            url: string;
        }
        image: {
            description: string;
            title: string;
            width: number;
            height: number;
            sources: [
                {
                    source: {
                        name: string;
                    }
                }
            ]
        }
    }
    widgetConfig: StoryContentWidgetConfig
}
