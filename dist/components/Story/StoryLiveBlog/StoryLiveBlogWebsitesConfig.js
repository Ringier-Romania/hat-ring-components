"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryLiveBlogWebsitesConfig = void 0;
exports.StoryLiveBlogWebsitesConfig = {
    "sections": [
        {
            "title": "Live Blog settings",
            "groups": {
                "liveBlog": {
                    "type": "group",
                    "name": "General",
                    "fields": [
                        "liveBlog.liveBlogPlatformUrl",
                        "liveBlog.liveBlogClientId",
                        "liveBlog.liveBlogLanguage",
                        "liveBlog.extensionAppName"
                    ]
                }
            },
            "keys": [
                "liveBlog"
            ]
        }
    ],
    "defaultParams": {
        "liveBlog": {
            "liveBlogPlatformUrl": "",
            "liveBlogClientId": "",
            "liveBlogLanguage": "",
            "extensionAppName": ""
        }
    },
    "paramsDescription": {
        "liveBlog": {
            "liveBlogPlatformUrl": {
                "name": "Platform url",
                "description": "Live Blog platform url",
                "type": "textfield"
            },
            "liveBlogClientId": {
                "name": "Client ID",
                "description": "platform Key",
                "type": "textfield"
            },
            "liveBlogLanguage": {
                "name": "Language",
                "description": "Live Blog language",
                "type": "textfield"
            },
            "extensionAppName": {
                "name": "Extension app code name",
                "description": "Extension app code name configured in settings of Story Editor",
                "type": "textfield"
            }
        }
    },
    "modules": {}
};
//# sourceMappingURL=StoryLiveBlogWebsitesConfig.js.map