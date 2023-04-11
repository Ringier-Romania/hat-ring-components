export declare let StoryMainImageWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        detailMainImage_wdg: {
            name: string;
            description: string;
            defaultParams: {
                platformDesktop: boolean;
                platformMobile: boolean;
                standardImageSize: string;
                customPosition: string;
                customWidth: string;
                cache: string;
                onError: string;
                widgetType: string;
            };
            paramsDescription: {
                widgetType: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                standardImageSize: {
                    name: string;
                    type: string;
                    description: string;
                };
                customClass: {
                    name: string;
                    description: string;
                    type: string;
                };
                customPosition: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                };
                customWidth: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: (string | number)[];
                    required: boolean;
                };
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
                cache: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                };
                onError: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                };
            };
        };
    };
};
