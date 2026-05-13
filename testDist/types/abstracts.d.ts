export declare const AbstractWebsitesWidgetConfigParamsDescription: {
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
export declare const AbstractWebsitesWidgetConfigDefaultParams: {
    platformDesktop: boolean;
    platformMobile: boolean;
    customClass: string;
    customPosition: string;
    customWidth: string;
};
