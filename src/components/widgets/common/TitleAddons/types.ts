import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface TitleAddonsResponse {
    data: { 
        story: { 
            titles?: Array<{
                role?: {
                    code?: string
                }
                text?: string}>, 
        } }
}

export interface TitleAddonsWidgetConfig extends AbstractWidgetConfig {
    response?: TitleAddonsResponse,
    titleAddonsCodeNames?: string
}