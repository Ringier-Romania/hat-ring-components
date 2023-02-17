/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../../types/types";
export declare enum BasicWidgetGeneralShowOptions {
    SectionElements = "sectionElements",
    ListElements = "listElements",
    Description = "description",
    Header = "header",
    Button = "button"
}
export declare enum BasicWidgetShowOptions {
    Image = "image",
    Title = "title",
    PublicationDate = "publicationDate",
    ModificationDate = "modificationDate",
    Lead = "lead",
    Authors = "authors",
    AuthorsImages = "authorsImages"
}
export declare enum BasicWidgetAdditionalOptions {
    "UseCroppedImage" = "useCroppedImage",
    "DisableCropAuto" = "disableCropAuto",
    "DisableCropImage" = "disableCropImage",
    "HideWhenNoSectionItems" = "Hide when no section items"
}
export interface BasicWidgetConfig extends AbstractWidgetConfig {
    generalShowOptions?: Array<BasicWidgetGeneralShowOptions>;
    showOptions?: Array<BasicWidgetShowOptions>;
    section_name?: string;
    listElements?: [];
    count?: string;
    offset?: number;
    countBig?: number;
    columns?: string;
    labelValue?: string;
    headerSeoTag?: string;
    labelLink?: string;
    description?: string;
    moreText?: string;
    moreUrl?: string;
    bigImageSize?: string;
    standardImageSize?: string;
    listElementsImageSize?: string;
    titleExtrasCodeNames?: string;
    alternativeTeasersCodeNames?: string;
    classificationList?: string;
    additionalOptions?: Array<BasicWidgetAdditionalOptions>;
}
export interface BasicWidgetParams extends WidgetParams {
    widgetConfig: BasicWidgetConfig;
    extendableAttributes?: {
        generalParts?: any;
        itemParts?: any;
        render?: (generalComponents: any, cssModules: any) => JSX.Element | null;
        getCssModule?: (defaultStyles: any) => string | null;
        getDataQueryNodeFragment?: string | null;
    };
}
export interface BasicWidgetResponseNode {
    title?: string;
    url?: string;
    lead?: string;
    creationTime?: string;
    modificationTime?: string;
    authors?: Array<string>;
    originalContent?: {
        image?: {
            url?: string;
            caption?: string;
        };
        creationTime?: string;
        modificationTime?: string;
        authors?: Array<{
            author?: {
                name?: string;
                image?: {
                    url?: string;
                    caption?: string;
                };
            };
        }>;
    };
    image?: {
        url?: string;
        caption?: string;
    };
}
export interface ListElementsData {
    text: string;
    Text: string;
    children: [];
    Title: string;
    Description: string;
    'Image src': string;
    'Image dimensions (eg. 600x300)': string;
    'Link url': string;
    'Custom CSS Class': string;
}
export interface ListElementsImage {
    url: string;
    caption: string;
    imageDim: string;
}
export interface BasicWidgetResponse {
    "data": {
        "section": {
            "items": {
                "edges": Array<{
                    node: BasicWidgetResponseNode;
                }>;
            };
        };
    };
}
