export declare let StoryLiveBlogWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        StoryLiveBlog: {
            name: string;
            description: string;
            defaultParams: {
                platformDesktop: boolean;
                platformMobile: boolean;
                extensionAppCodeName: string;
                liveBlogPlatformUrl: string;
                liveBlogClientId: string;
                liveBlogLanguage: string;
                customClass: string;
                customPosition: string;
                customWidth: string;
                widgetType: string;
            };
            paramsDescription: {
                widgetType: {
                    name: string;
                    description: string;
                    type: string;
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
                extensionAppCodeName: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                liveBlogPlatformUrl: {
                    name: string;
                    type: string;
                    required: boolean;
                };
                liveBlogClientId: {
                    name: string;
                    type: string;
                    required: boolean;
                };
                liveBlogLanguage: {
                    name: string;
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
            };
        };
    };
};
