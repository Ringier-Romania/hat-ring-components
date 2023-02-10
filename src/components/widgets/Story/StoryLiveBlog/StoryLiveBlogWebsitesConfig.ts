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
                "platformDesktop": true,
                "platformMobile": true,
                "extensionAppCodeName": "liveblog",
                "liveBlogPlatformUrl": "client.liveblog.dreamlab.pl",
                "liveBlogClientId": "",
                "liveBlogLanguage":"",
                "liveBlogId": "",
                "customClass": "",
                "customPosition": "none",
                "customWidth": "none",
                "widgetType": "StoryLiveBlog"
            },
            "paramsDescription": {
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                },
                "platformDesktop": {
                    "name": "Desktop",
                    "type": "checkbox",
                    "description": "Desktop"
                },
                "platformMobile": {
                    "name": "Mobile",
                    "type": "checkbox",
                    "description": "Mobile"
                },
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
                "customClass": {
                    "name": "custom CSS class",
                    "description": "custom CSS class",
                    "type": "textfield"
                },
                "customPosition": {
                    "name": "Custom position",
                    "description": "(widget in BOX)",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none",
                        "left",
                        "center",
                        "right"
                    ]
                },
                "customWidth": {
                    "name": "Custom width",
                    "description": "(widget in BOX)",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": ["none", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    "required": false
                }
            }
        }
    }
}
