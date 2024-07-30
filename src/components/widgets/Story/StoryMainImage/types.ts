import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "@hatTypes/types";

export interface StoryMainImageResponse {
    "data": {
        "story": {
            "image": {
                "url": string,
                "caption": string | null
            }
        }
    }
}

export interface  StoryMainImageWidgetConfig extends AbstractWidgetConfig {
    response?: StoryMainImageResponse,
    standardImageSize?: string,
    imageSizeMobile?: string,
}

export interface StoryMainImageParams extends WidgetParams {
    widgetConfig: StoryMainImageWidgetConfig
}
