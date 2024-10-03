import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryTitleAddonsResponse {
    data: { 
        story: { 
            titles?: Array<{
                role?: {
                    code?: string
                }
                text?: string}>, 
        } }
}

export interface StoryTitleAddonsWidgetConfig extends AbstractWidgetConfig {
    response?: StoryTitleAddonsResponse,
    titleAddonsCodeNames?: string,
    cacheTTL?: number,
}