export declare let StoryLiveBlogWebsitesConfig: {
    sections: {
        title: string;
        groups: {
            liveBlog: {
                type: string;
                name: string;
                fields: string[];
            };
        };
        keys: string[];
    }[];
    defaultParams: {
        liveBlog: {
            liveBlogPlatformUrl: string;
            liveBlogClientId: string;
            liveBlogLanguage: string;
            extensionAppName: string;
        };
    };
    paramsDescription: {
        liveBlog: {
            liveBlogPlatformUrl: {
                name: string;
                description: string;
                type: string;
            };
            liveBlogClientId: {
                name: string;
                description: string;
                type: string;
            };
            liveBlogLanguage: {
                name: string;
                description: string;
                type: string;
            };
            extensionAppName: {
                name: string;
                description: string;
                type: string;
            };
        };
    };
    modules: {};
};
