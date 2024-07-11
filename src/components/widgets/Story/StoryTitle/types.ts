import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryTitleResponse {
    data: { 
        story: { 
            title: string,
            titles?: Array<{
                role?: {
                    code?: string
                }
                text?: string}>, 
        } }
}

export interface StoryTitleWidgetConfig extends AbstractWidgetConfig {
    response?: StoryTitleResponse
}

export interface StoryTitleParams extends WidgetParams {
    widgetConfig: StoryTitleWidgetConfig,
}
