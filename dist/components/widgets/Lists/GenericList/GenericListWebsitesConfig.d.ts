export declare let StoryLiveBlogWebsitesConfig: {
    sections: never[];
    defaultParams: {};
    paramsDescription: {};
    modules: {
        genericList_wdg: {
            name: string;
            description: string;
            defaultParams: {
                showOptions: string[];
                headerText: string;
                headerTag: string;
                columns: number;
                paginationElements: number;
                postShift: number;
                customListUuid: string;
                customClass: string;
                customPosition: string;
                customWidth: string;
                imageSize: string;
                imageSizeMobile: string;
                sort: string;
                platformDesktop: boolean;
                platformMobile: boolean;
                cache: string;
                onError: string;
                widgetType: string;
            };
            paramsDescription: {
                showOptions: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: string[];
                    required: boolean;
                };
                headerText: {
                    name: string;
                    description: string;
                    type: string;
                };
                headerTag: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
                    items: string[];
                };
                columns: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    items: number[];
                    required: boolean;
                };
                paginationElements: {
                    name: string;
                    description: string;
                    type: string;
                };
                postShift: {
                    name: string;
                    description: string;
                    type: string;
                };
                customListUuid: {
                    name: string;
                    description: string;
                    type: string;
                };
                customClass: {
                    name: string;
                    description: string;
                    type: string;
                    required: boolean;
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
                imageSize: {
                    name: string;
                    type: string;
                    description: string;
                };
                imageSizeMobile: {
                    name: string;
                    type: string;
                    description: string;
                };
                showTotalElements: {
                    name: string;
                    type: string;
                };
                sort: {
                    name: string;
                    description: string;
                    type: string;
                    allowBlank: boolean;
                    multiSelect: boolean;
                    required: boolean;
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
