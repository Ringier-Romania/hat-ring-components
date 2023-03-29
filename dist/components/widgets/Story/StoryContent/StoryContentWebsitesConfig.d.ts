export declare let StoryContentWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        detailContent_wdg: {
            name: string;
            description: string;
            defaultParams: {
                widgetType: string;
                standardImageWidth: string;
                standardImageHeight: string;
                displayFrom: string;
                displayTo: string;
                customPosition: string;
                customWidth: string;
                amdModule: string;
                platformDesktop: boolean;
                platformMobile: boolean;
                cache: string;
                onError: string;
            };
            paramsDescription: {
                widgetType: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                standardImageWidth: {
                    name: string;
                    type: string;
                    description: string;
                };
                standardImageHeight: {
                    name: string;
                    type: string;
                    description: string;
                };
                displayFrom: {
                    name: string;
                    description: string;
                    type: string;
                };
                displayTo: {
                    name: string;
                    description: string;
                    type: string;
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
                amdModule: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
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
