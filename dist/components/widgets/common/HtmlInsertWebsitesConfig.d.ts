export declare let HtmlInsertWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        html_wdg: {
            name: string;
            description: string;
            defaultParams: {
                widgetType: string;
                platformDesktop: boolean;
                platformMobile: boolean;
                plainHtml: string;
                customClass: string;
                customId: string;
                customPosition: string;
                customWidth: string;
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
                plainHtml: {
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
                customId: {
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
