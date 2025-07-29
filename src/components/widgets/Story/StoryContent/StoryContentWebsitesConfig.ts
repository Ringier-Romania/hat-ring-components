import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryContentWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailContent_wdg": {
            "name": "Story Content",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "standardImageWidth": "",
                "standardImageHeight": "",
                "mobileImageWidth": "",
                "mobileImageHeight": "",
                "displayFrom": "",
                "displayTo": "",
                "ignoredFrameBlocksNames": "",
                "widgetType": "detailContent",
                "additionalComponents": [],
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "standardImageWidth": {
                    "name": "Max image width",
                    "type": "textfield",
                    "description": "Maximum image width in px (empty = original)"
                },
                "standardImageHeight": {
                    "name": "Max image height",
                    "type": "textfield",
                    "description": "Maximum image height in px (empty = original)"
                },
                "mobileImageWidth": {
                    "name": "Max image width for mobile",
                    "type": "textfield",
                    "description": "Maximum image width in px (empty = original) for mobile"
                },
                "mobileImageHeight": {
                    "name": "Max image height for mobile",
                    "type": "textfield",
                    "description": "Maximum image height in px (empty = original) for mobile"
                },
                "displayFrom": {
                    "name": "Display blocks from",
                    "description": "1 is first, empty display all",
                    "type": "textfield"
                },
                "displayTo": {
                    "name": "Display blocks to",
                    "description": "empty is to the end",
                    "type": "textfield"
                },
                "ignoredFrameBlocksNames": {
                    "name": "Ignored Frame Block Names",
                    "description": "Comma-separated block names to exclude from displaying, or leave empty to include all.",
                    "type": "textfield"
                },
                "additionalComponents": {
                    "type": "treeobject",
                    "name": "Additional Components",
                    "description": "List of additional components",
                    "required": false,
                    "properties": [
                        {
                            "name": "widget",
                            "type": "textfield",
                            "description": "widget to insert e.g htmlInsert"
                        },
                        {
                            "name": "platformDesktop",
                            "description": "Desktop",
                            "type": "checkbox"
                        },
                        {
                            "name": "platformMobile",
                            "description": "Mobile",
                            "type": "checkbox"
                        },
                        {
                            "name": "customCssClass",
                            "description": "custom CSS class",
                            "type": "textfield"
                        },
                        {
                            "name": "limit",
                            "type": "textfield",
                            "description": "limit number of components"
                        },
                        {
                            "name": "pattern",
                            "type": "textfield",
                            "description": "Pattern for elements appearance: 'n' after every element, '2n+1' after every second element, 'n-1' before the first element, 'n+2' after the second element, etc. Use negative numbers to insert before elements. Negative multipliers are not supported."

                        },
                        {
                            "name": "config",
                            "type": "code",
                            "mode": "json"
                        },
                    ]
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                }
            }
        }
    }
}
