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
    additionalOptions: ['useCroppedImage'];
    dedicatedStyleForWidget: string;
}
export interface BasicWidgetParams extends WidgetParams {
    widgetConfig: BasicWidgetConfig;
    extendableAttributes?: {
        generalParts?: any;
        itemParts?: any;
        render?: (generalComponents: any, cssModules: any) => JSX.Element | null;
        getCssModule?: (defaultStyles: any) => string | null;
    };
}
export interface BasicWidgetResponseNode {
    title: string;
    url: string;
    lead: string;
    originalContent: {
        image: {
            url: string;
            caption: string;
        };
    };
    image: {
        url: string;
        caption: string;
    };
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
