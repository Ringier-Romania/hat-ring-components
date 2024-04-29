import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";
import {GenericListWidgetConfig} from "../../Lists/GenericList/types";

export enum StoryRelatedContentAutocompleteFromEnum {
    FirstStoryTag = 'firstStoryTag'
}

export interface StoryRelatedContentWidgetConfig extends AbstractWidgetConfig {
    showOptions?: GenericListWidgetConfig['showOptions'],
    relatedContentCodeName?: string,
    widgetType?: string,
    columns?: number,
    paginationElements?: number,
    imageSize?: string,
    imageSizeMobile?: string,
    "excludedFlags": Array<{
        excludedFlag: string
    }>,
    customTeasers?: Array<{
        'Teaser code name'?: string,
        'For mobile'?: 'on',
        // for future
        // 'For big image'?: 'on'
    }>,
    moreText?: string,
    moreUrl?: string,
    autocomplete?: boolean,
    autocompleteFrom?: StoryRelatedContentAutocompleteFromEnum,
}

export interface StoryRelatedContentParams extends WidgetParams {
    widgetConfig: StoryRelatedContentWidgetConfig,
}
