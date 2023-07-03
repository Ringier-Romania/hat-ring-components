import {AbstractWidgetConfig, AppContext, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryContentWidgetConfig extends AbstractWidgetConfig {
    standardImageWidth?: string | number,
    standardImageHeight?: string | number,
    displayFrom?: string | number,
    displayTo?: string | number,
}

export interface StoryContentExtendableAttributes {
    customGroupBlocks?: any,
    render?: (defaultStyles) => JSX.Element | null,
    getCssModule?: (defaultStyles) => string | null,
    getDataQueryStoryFragment?: string | null,
}

export interface StoryContentParams extends WidgetParams {
    widgetConfig: StoryContentWidgetConfig,
    extendableAttributes?: StoryContentExtendableAttributes,
}

export interface StoryContentSwitcherParams {
    content: any[];
    context: AppContext;
    widgetConfig: StoryContentWidgetConfig,
    extendableAttributes?: StoryContentExtendableAttributes,
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
        alignment: string,
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
