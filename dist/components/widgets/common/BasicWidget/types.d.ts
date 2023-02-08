/// <reference types="react" />
import { WidgetParams } from "../../../../types/types";
declare enum BasicWidgetGeneralShowOptions {
    sectionElements = "sectionElements",
    listElements = "listElements",
    header = "header",
    description = "description",
    button = "button"
}
export interface BasicWidgetConfig {
    name: string;
    module: string;
    platformDesktop: true;
    platformMobile: false;
    generalShowOptions: Array<BasicWidgetGeneralShowOptions>;
    showOptions: ['image', 'title'];
    section_name: 'podcasts';
    listElements: [];
    customClass: 'cy-podcasts';
    template: 'basicWidget';
    amdModule: 'none';
    customPosition: 'none';
    customWidth: 'none';
    count: '3';
    offset: 0;
    countBig: 0;
    columns: '3';
    labelValue: '';
    headerSeoTag: string;
    labelLink: '';
    description: '';
    moreText: '';
    moreUrl: '';
    customId: '';
    customBg: '';
    bigImageSize: '1200x660';
    standardImageSize: '600x330';
    listElementsImageSize: '600x330';
    titleExtrasCodeNames: '';
    alternativeTeasersCodeNames: '';
    classificationList: 'category,tag';
    slider: 'none';
    cache: 'min';
    onError: 'abort';
    widgetType: 'basicWidget';
    decorators: [];
    lazyload: 'enabled';
    additionalOptions: ['useCroppedImage', "Hide when no section items"];
    dedicatedStyleForWidget: string;
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
    title: string;
    url: string;
    lead: string;
    creationTime: string;
    modificationTime: string;
    authors: Array<string>;
    originalContent: {
        image: {
            bigImageUrl: string;
            url: string;
            caption: string;
        };
        creationTime: string;
        modificationTime: string;
        authors: Array<{
            author: {
                name: string;
                image: {
                    url: string;
                    caption: string;
                };
            };
        }>;
    };
    image: {
        url: string;
        caption: string;
        bigImageUrl: string;
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
export {};
