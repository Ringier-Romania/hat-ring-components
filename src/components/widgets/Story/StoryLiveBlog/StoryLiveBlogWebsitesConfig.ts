import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryLiveBlogWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "StoryLiveBlog": {
            "name": "Story Live Blog",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "extensionAppCodeName": "liveblog",
                "liveBlogPlatformUrl": "https://client.liveblog.dreamlab.pl",
                "liveBlogClientId": "",
                "liveBlogLanguage":"",
                "liveBlogId": "",
                "widgetType": "StoryLiveBlog"
            },
            "paramsDescription": {
               ...AbstractWebsitesWidgetConfigParamsDescription,
                "extensionAppCodeName": {
                    "name": "Extension app code name",
                    "description": "Extension app code name configured in settings of Story Editor",
                    "type": "textfield",
                    "required": false
                },
                "liveBlogPlatformUrl": {
                    "name": "LiveBlog Platform Url",
                    "type": "textfield",
                    "required": false
                },
                "liveBlogClientId": {
                    "name": "LiveBlog Client Id",
                    "type": "textfield",
                    "required": true
                },
                "liveBlogLanguage": {
                    "name": "liveBlog Language",
                    "type": "textfield",
                    "required": true
                },
                "liveBlogId": {
                    "name": "liveBlog ID",
                    "description": "Provide it to render particular LiveBlog instead of connected with Story",
                    "type": "textfield",
                    "required": true
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "textfield"
                },
            }
        }
    }
}
