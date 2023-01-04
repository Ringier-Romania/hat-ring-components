export declare let BasicWidgetConfig: {
    sections: never[];
    defaultParams: {
        general: {
            flagsOrder: string;
        };
    };
    paramsDescription: {
        general: {
            flagsOrder: {
                name: string;
                description: string;
                type: string;
            };
        };
    };
    modules: {
        basicWidget_wdg: {
            name: string;
            description: string;
            defaultParams: {
                platformDesktop: boolean;
                platformMobile: boolean;
                generalShowOptions: string[];
                showOptions: string[];
                additionalOptions: never[];
                section_name: string;
                listElements: never[];
                customClass: string;
                template: string;
                amdModule: string;
                customPosition: string;
                customWidth: string;
                count: number;
                offset: number;
                countBig: number;
                columns: number;
                lazyload: string;
                dedicatedStyleForWidget: string;
                labelValue: string;
                headerSeoTag: string;
                labelLink: string;
                description: string;
                moreText: string;
                moreUrl: string;
                customId: string;
                customBg: string;
                bigImageSize: string;
                standardImageSize: string;
                listElementsImageSize: string;
                preloadImagesCount: number;
                mobilePreloadImagesCount: number;
                titleExtrasCodeNames: string;
                alternativeTeasersCodeNames: string;
                classificationList: string;
                slider: string;
                decorators: never[];
                cache: string;
                onError: string;
                widgetType: string;
            };
            paramsDescription: {
                platformDesktop: {
                    name: string;
                    type: string;
                    description: string;
                };
                platformMobile: {
                    name: string;
                    type: string;
                    description: string;
                };
                generalShowOptions: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                showOptions: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                additionalOptions: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                    required: boolean;
                };
                section_name: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                listElements: {
                    type: string;
                    name: string;
                    description: string;
                    required: boolean;
                    properties: {
                        name: string;
                        type: string;
                    }[];
                };
                customClass: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                template: {
                    name: string;
                    type: string;
                    description: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                amdModule: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                customPosition: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                customWidth: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: (string | number)[];
                };
                count: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                offset: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                countBig: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                columns: {
                    name: string;
                    type: string;
                    description: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: number[];
                };
                lazyload: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                };
                dedicatedStyleForWidget: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                };
                labelValue: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                headerSeoTag: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                labelLink: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                description: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                moreText: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                moreUrl: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                customId: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                customBg: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                standardImageSize: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                bigImageSize: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                listElementsImageSize: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                preloadImagesCount: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                mobilePreloadImagesCount: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                titleExtrasCodeNames: {
                    name: string;
                    description: string;
                    type: string;
                };
                alternativeTeasersCodeNames: {
                    name: string;
                    description: string;
                    type: string;
                };
                classificationList: {
                    name: string;
                    type: string;
                    description: string;
                    required: boolean;
                };
                slider: {
                    name: string;
                    type: string;
                    description: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                decorators: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: never[];
                };
                cache: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                onError: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                widgetType: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
            };
        };
    };
};
