import {AbstractWidgetConfig, AppContext, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryTaxonomyListWidgetConfig extends AbstractWidgetConfig {
    taxonomyKind: string,
    listPrefix: string,
    links: boolean,
    linksPrefix: string,
}

export interface StoryTaxonomyListParams extends WidgetParams {
    widgetConfig: StoryTaxonomyListWidgetConfig
}
