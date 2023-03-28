export declare let StoryTitleWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        detailTitle_wdg: {
            name: string;
            description: string;
            defaultParams: {
                widgetType: string;
                customPosition: string;
                customWidth: string;
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
