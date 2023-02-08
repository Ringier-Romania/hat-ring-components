export declare let ExternalApplicationWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        external_wdg: {
            name: string;
            description: string;
            defaultParams: {
                widgetType: string;
                platformDesktop: boolean;
                platformMobile: boolean;
                controllerUrl: string;
                blockName: string;
                selector: string;
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
                controllerUrl: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                blockName: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
                };
                selector: {
                    name: string;
                    description: string;
                    type: string;
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
            };
        };
    };
};
