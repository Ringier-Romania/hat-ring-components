import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

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
    standardImageSize?: string
}

export interface StoryMainImageParams extends WidgetParams {
    widgetConfig: StoryMainImageWidgetConfig
}
