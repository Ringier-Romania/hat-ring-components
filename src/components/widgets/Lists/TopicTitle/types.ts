import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";

export interface TopicTitleResponse {
    data: { topic: { name: string } }
}

export interface TopicTitleWidgetConfig extends AbstractWidgetConfig {
    response?: TopicTitleResponse
}

export interface TopicTitleParams extends WidgetParams {
    widgetConfig: TopicTitleWidgetConfig,
}
