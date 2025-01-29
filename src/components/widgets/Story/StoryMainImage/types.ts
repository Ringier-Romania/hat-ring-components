import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryMainImageResponse {
    "data": {
        "story": {
            "image": {
                "caption": string | null
                "image": {
                    "url": string,
                    "description": string | null
                    "width": number
                    "height": number
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
