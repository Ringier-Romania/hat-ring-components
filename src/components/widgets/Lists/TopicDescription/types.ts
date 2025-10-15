import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";

export interface TopicDescriptionBlock {
    text?: string;
}

export interface TopicDescriptionContent {
    blocks: TopicDescriptionBlock[];
}

export interface TopicDescriptionResponse {
    data: {
        topic: {
            name: string;
            description: {
                content: TopicDescriptionContent[];
            };
        };
    };
}

export interface TopicDescriptionWidgetConfig extends AbstractWidgetConfig {
    response?: TopicDescriptionResponse;
    cacheTTL?: number;
}

export interface TopicDescriptionParams extends WidgetParams {
    widgetConfig: TopicDescriptionWidgetConfig;
}
