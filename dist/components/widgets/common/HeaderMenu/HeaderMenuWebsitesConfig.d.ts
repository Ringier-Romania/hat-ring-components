export declare let HeaderMenuWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        headerMenu_wdg: {
            name: string;
            description: string;
            defaultParams: {
                widgetType: string;
                overrideMenuElements: never[];
                textColor: string;
                additionalOptions: never[];
                platformDesktop: boolean;
                platformMobile: boolean;
                customWidth: string;
                customClass: string;
                cache: string;
                onError: string;
            };
            paramsDescription: {
                overrideMenuElements: {
                    type: string;
                    name: string;
                    description: string;
                    properties: {
                        name: string;
                        type: string;
                    }[];
                };
                textColor: {
                    name: string;
                    description: string;
                    type: string;
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
                customClass: {
                    name: string;
                    description: string;
                    type: string;
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
