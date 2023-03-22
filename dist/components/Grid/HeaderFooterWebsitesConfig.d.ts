export declare let HeaderFooterWebsitesConfig: {
    sections: {
        title: string;
        keys: string[];
        groups: {
            header: {
                type: string;
                name: string;
                fields: string[];
            };
            headerWidgets: {
                type: string;
                name: string;
                fields: string[];
            };
            footer: {
                type: string;
                name: string;
                fields: string[];
            };
            footerWidgets: {
                type: string;
                name: string;
                fields: string[];
            };
        };
    }[];
    defaultParams: {
        header: {
            headerBackground: string;
            menuElements: never[];
            customClass: string;
        };
        headerWidgets: {
            widgets_above_content: never[];
            widgets_middle_content: never[];
            widgets_below_content: never[];
        };
        footer: {
            customClass: string;
        };
        footerWidgets: {
            widgets_above_content: never[];
            widgets_middle_content: never[];
            widgets_under_content: never[];
        };
    };
    paramsDescription: {
        header: {
            headerBackground: {
                name: string;
                description: string;
                type: string;
            };
            menuElements: {
                type: string;
                name: string;
                description: string;
                properties: {
                    name: string;
                    type: string;
                }[];
            };
            customClass: {
                name: string;
                description: string;
                type: string;
            };
        };
        headerWidgets: {
            widgets_above_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_middle_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_below_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
        };
        footer: {
            menuElements: {
                type: string;
                name: string;
                description: string;
                properties: {
                    name: string;
                    type: string;
                }[];
            };
            customClass: {
                name: string;
                description: string;
                type: string;
            };
        };
        footerWidgets: {
            widgets_above_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_middle_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_under_content: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
        };
    };
};
