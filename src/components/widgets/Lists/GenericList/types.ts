import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import {Content, PublicationPoint, Topic} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

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
    "excludedFlags":Array<{
        excludedFlag: string
    }>,
    "linkLabel": string,
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

export interface GenericListResponseNode {
    title?: string,
    mainPublicationPoint?: PublicationPoint,
    topics?: Array<{topic: Topic}>,
    image?: { url?: string, caption?: string, }
    date?: {modificationTime: string, creationTime: string},
    content?: Array<Content>
}


export interface GenericListResponse {
    data: {
        stories: {
            total: number,
            edges: Array<{ node: GenericListResponseNode }>
        }
    }
}
