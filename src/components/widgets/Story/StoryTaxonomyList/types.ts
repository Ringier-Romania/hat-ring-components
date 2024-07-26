import {AbstractWidgetConfig, AppContext, ComponentParams, WidgetParams} from "@hatTypes/types";
import {Topic} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

export interface StoryTaxonomyListWidgetConfig extends AbstractWidgetConfig {
    taxonomyKind: string,
    listPrefix: string,
    links: boolean,
    excludedUuids: string,
}

export interface StoryTaxonomyListParams extends WidgetParams {
    widgetConfig: StoryTaxonomyListWidgetConfig
}

export interface StoryTaxonomyListTopicResponse {
    "__typename": string,
    "topic": Topic
}

export interface StoryTaxonomyListResponse {
    "data": {
        "story": {
            "__typename": string,
            "topics": StoryTaxonomyListTopicResponse[],
        }
    }
}


