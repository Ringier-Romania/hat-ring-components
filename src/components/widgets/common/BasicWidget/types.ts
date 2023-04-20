import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";

export enum BasicWidgetGeneralShowOptions {
    SectionElements = "sectionElements",
    ListElements = "listElements",
    Description = "description",
    Header = "header",
    Button = "button"
}

export enum BasicWidgetShowOptions {
    Image = 'image',
    Title = 'title',
    PublicationDate = 'publicationDate',
    ModificationDate = 'modificationDate',
    Lead = 'lead',
    // Flags = 'flags',
    Authors = 'authors',
    AuthorsImages = 'authorsImages',
    // TitleExtras = 'titleExtras',
    // AlternativeTeasers = 'alternativeTeasers',
    // OrdinalNumber = 'ordinalNumber',
}

export enum BasicWidgetAdditionalOptions {
    "UseCroppedImage" = 'useCroppedImage',
    "DisableCropAuto" = 'disableCropAuto',
    "DisableCropImage" = 'disableCropImage',
    "HideWhenNoSectionItems" = 'Hide when no section items',
}

export interface BasicWidgetConfig extends AbstractWidgetConfig {
    generalShowOptions?: Array<BasicWidgetGeneralShowOptions>,
    showOptions?: Array<BasicWidgetShowOptions>,
    section_name?: string,
    listElements?: [],
    count?: string,
    offset?: number,
    countBig?: number,
    columns?: string,
    labelValue?: string,
    headerSeoTag?: string,
    labelLink?: string,
    description?: string,
    moreText?: string,
    moreUrl?: string,
    bigImageSize?: string,
    standardImageSize?: string,
    listElementsImageSize?: string,
    titleExtrasCodeNames?: string,
    alternativeTeasersCodeNames?: string,
    classificationList?: string,
    additionalOptions?: Array<BasicWidgetAdditionalOptions>
}

export interface BasicWidgetExtendableAttributes {
    generalParts?: any,
    itemParts?: any,
    render?: (generalComponents, cssModules) => JSX.Element | null,
    getCssModule?: (defaultStyles) => string | null,
    getDataQueryNodeFragment?: string | null,
}

export interface BasicWidgetParams extends WidgetParams {
    widgetConfig: BasicWidgetConfig,
    extendableAttributes?: BasicWidgetExtendableAttributes
}

export interface BasicWidgetResponseNode {
    title?: string,
    url?: string,
    lead?: string,
    creationTime?: string,
    modificationTime?: string,
    authors?: Array<string>,
    originalContent?: {
        image?: {
            url?: string,
            caption?: string
        }
        creationTime?: string,
        modificationTime?: string,
        authors?: Array<{
            author?: {
                name?: string,
                image?: {
                    url?: string
                    caption?: string
                }
            }
        }>,
    },
    image?: { url?: string, caption?: string, }
}

export interface ListElementsData {
    text: string,
    Text: string,
    children: [],
    Title: string,
    Description: string,
    'Image src': string,
    'Image dimensions (eg. 600x300)': string,
    'Link url': string,
    'Custom CSS Class': string
}

export interface ListElementsImageData {
    url: string,
    caption: string,
    imageDim: string
}

export interface BasicWidgetResponse {
    "data": {
        "section": {
            "items": {
                "edges": Array<{ node: BasicWidgetResponseNode }>
            }
        }
    }
}
