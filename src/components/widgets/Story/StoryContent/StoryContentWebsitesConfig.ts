export let StoryContentWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailContent_wdg": {
            "name": "Detail Content",
            "description": "",
            "defaultParams": {
                "widgetType": "detailContent",
                "standardImageWidth": "",
                "standardImageHeight": "",
                "displayFrom": "",
                "displayTo": "",
                "customPosition": "none",
                "customWidth": "none",
                "amdModule": "none",
                "platformDesktop": true,
                "platformMobile": true,
                "cache": "",
                "onError": ""
            },
            "paramsDescription": {
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                },
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
                },
                "amdModule": {
                    "name": "Custom AMD module",
                    "description": "Custom AMD module",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none"
                    ]
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
                "cache": {
                    "name": "cache",
                    "description": "cache value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none",
                        "min",
                        "mdm",
                        "max"
                    ]
                },
                "onError": {
                    "name": "onError",
                    "description": "onError value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "discard",
                        "abort"
                    ]
                }
            }
        }
    }
}
