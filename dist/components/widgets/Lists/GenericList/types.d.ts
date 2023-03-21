/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../../types/types";
export interface GenericListWidgetConfig extends AbstractWidgetConfig {
    "showOptions": Array<"image" | "title">;
    "headerText": string;
    "headerTag": string;
    "columns": number;
    "paginationElements": number;
    "postShift": number;
    "customListUuid": string;
    "imageSize": string;
    "imageSizeMobile": string;
}
export interface GenericListExtendableAttributes {
    itemParts?: any;
    render?: (cssModules: any) => JSX.Element | null;
    getCssModule?: (defaultStyles: any) => string | null;
    getDataQueryNodeFragment?: string | null;
}
export interface GenericListParams extends WidgetParams {
    widgetConfig: GenericListWidgetConfig;
    extendableAttributes?: GenericListExtendableAttributes;
}
export interface GenericListResponseNode {
    title?: string;
    mainPublicationPoint?: {
        url: string;
    };
    image?: {
        url?: string;
        caption?: string;
    };
}
export interface GenericListResponse {
    data: {
        stories: {
            total: number;
            edges: Array<{
                node: GenericListResponseNode;
            }>;
        };
    };
}
