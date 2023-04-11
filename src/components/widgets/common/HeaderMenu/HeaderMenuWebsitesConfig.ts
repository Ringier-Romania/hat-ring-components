export let HeaderMenuWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "headerMenu_wdg": {
            "name": "Header menu",
            "description": "",
            "defaultParams": {
                "widgetType": "headerMenu",
                "overrideMenuElements": [],
                "textColor": "",
                "additionalOptions": [],
                "platformDesktop": true,
                "platformMobile": true,
                "customWidth": "none",
                "customClass": "",
                "cache": "",
                "onError": ""
            },
            "paramsDescription": {
                "overrideMenuElements": {
                    "type": "treeobject",
                    "name": "Menu elements",
                    "description": "",
                    "properties": [
                        {
                            "name": "url",
                            "type": "textfield"
                        },
                        {
                            "name": "hidden",
                            "type": "checkbox"
                        },
                        {
                            "name": "open in new tab",
                            "type": "checkbox"
                        },
                        {
                            "name": "custom css class",
                            "type": "textfield"
                        },
                        {
                            "name": "image url",
                            "type": "textfield"
                        },
                        {
                            "name": "image dimensions (eg. 200x200)",
                            "type": "textfield"
                        }
                    ]
                },
                "textColor": {
                    "name": "Menu elements - custom color (name or HEX)",
                    "description": "Menu elements - custom color (name or HEX)",
                    "type": "textfield"
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
                "customClass": {
                    "name": "custom CSS class",
                    "description": "custom CSS class",
                    "type": "textfield"
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
                },
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                }
            }
        }
    }
}
