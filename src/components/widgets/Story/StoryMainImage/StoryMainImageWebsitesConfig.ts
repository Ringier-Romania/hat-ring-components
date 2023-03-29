export let StoryMainImageWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailMainImage_wdg": {
            "name": "Detail Main Image",
            "description": "",
            "defaultParams": {
                "platformDesktop": true,
                "platformMobile": true,
                "standardImageSize": "920x500",
                "customPosition": "none",
                "customWidth": "none",
                "cache": "",
                "onError": "",
                "widgetType": "detailMainImage"
            },
            "paramsDescription": {
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                },
                "standardImageSize": {
                    "name": "Standard image resolution",
                    "type": "textfield",
                    "description": "Standard image resolution (empty = original), example: 920x500"
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
                    "items": [
                        "none", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                    ],
                    "required": false
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
