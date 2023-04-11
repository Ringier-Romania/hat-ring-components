import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";

export interface GenericListWidgetConfig extends AbstractWidgetConfig {
    "showOptions": Array<"image" | "title">,
    "headerText": string,
    "headerTag": string,
    "columns": number | string,
    "paginationElements": number | string,
    "postShift": number | string,
    "customListUuid": string,
    "imageSize": string,
    "imageSizeMobile": string,
}

export interface GenericListExtendableAttributes {
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
    mainPublicationPoint?: {
        url: string
    },
    image?: { url?: string, caption?: string, }
}


export interface GenericListResponse {
    data: {
        stories: {
            total: number,
            edges: Array<{ node: GenericListResponseNode }>
        }
    }
}
