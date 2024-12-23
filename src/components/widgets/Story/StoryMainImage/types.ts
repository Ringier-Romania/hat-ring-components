import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryMainImageResponse {
    "data": {
        "story": {
            "image": {
                "url": string,
                "caption": string | null
                "image": {
                    "description": string | null
                }
            }
        }
    }
}

export interface  StoryMainImageWidgetConfig extends AbstractWidgetConfig {
    response?: StoryMainImageResponse,
    standardImageSize?: string,
    imageSizeMobile?: string,
    cacheTTL?: number,
}

export interface StoryMainImageParams extends WidgetParams {
    widgetConfig: StoryMainImageWidgetConfig
}
