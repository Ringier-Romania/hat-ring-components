import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import {GenericListWidgetConfig} from "../../Lists/GenericList/types";

export interface StorySimilarStoriesWidgetConfig extends AbstractWidgetConfig {
    showOptions?: GenericListWidgetConfig['showOptions'],
    headerText?: string,
    headerTag?: string,
    limit?: number,
    imageSize?: string,
    imageSizeMobile?: string,
    "excludedFlags": Array<{
        excludedFlag: string
    }>,
    "allowedKinds": Array<{
        kindCode: string
    }>,
    customTeasers?: Array<{
        'Teaser code name'?: string,
        'For mobile'?: 'on',
    }>,
    cacheTTL?: number,
}

export interface StorySimilarStoriesParams extends WidgetParams {
    widgetConfig: StorySimilarStoriesWidgetConfig,
}

