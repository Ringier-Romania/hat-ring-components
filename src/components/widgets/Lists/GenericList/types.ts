import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import {
    Content,
    PublicationPoint,
    Story,
    StoryEdge,
    Topic
} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

export enum GenericListGeneralShowOptions {
    Items = "items",
    Header = "header",
    Pagination = "pagination"
}

export enum GenericListShowOptions {
    Image = "image",
    Title = "title",
}

export interface GenericListWidgetConfig extends AbstractWidgetConfig {
    generalShowOptions?: Array<GenericListGeneralShowOptions>,
    "showOptions": Array<GenericListShowOptions>,
    "headerText": string,
    "headerTag": string,
    "columns": number | string,
    "paginationElements": number | string,
    "postShift": number | string,
    "customListUuid": string,
    "imageSize": string,
    "imageSizeMobile": string,
    "preloadImagesCount": number,
    "mobilePreloadImagesCount": number,
    "excludedFlags": Array<{
        excludedFlag: string
    }>,
    "linkLabel": string,
    "mainSeoList": boolean,
    customTeasers?: Array<{
        'Teaser code name'?: string,
        'For mobile'?: 'on',
        // for future
        // 'For big image'?: 'on'
    }>,
    moreText?: string,
    moreUrl?: string,
}

export interface GenericListExtendableAttributes {
    generalParts?: any,
    itemParts?: any,
    render?: (cssModules) => JSX.Element | null,
    getCssModule?: (defaultStyles) => string | null,
    getDataQueryNodeFragment?: string | null,
}

export interface GenericListParams extends WidgetParams {
    widgetConfig: GenericListWidgetConfig,
    extendableAttributes?: GenericListExtendableAttributes,
}

export interface GenericListResponseNode extends Story {

}


export interface GenericListResponse {
    data: {
        stories: {
            total: number,
            edges: Array<{ node: GenericListResponseNode }>
        }
    }
}
