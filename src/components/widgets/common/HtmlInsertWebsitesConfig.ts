export let HtmlInsertWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "html_wdg": {
            "name": "Ring HTML Insert",
            "description": "",
            "defaultParams": {
                "widgetType": "htmlInsert",
                "platformDesktop": true,
                "platformMobile": true,
                "plainHtml": "",
                "customClass": "",
                "customId": "",
                "customPosition": "none",
                "customWidth": "none",
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
                "plainHtml": {
                    "name": "HTML",
                    "description": "HTML code",
                    "type": "textfield",
                    "required": false
                },
                "customClass": {
                    "name": "custom CSS class",
                    "description": "custom CSS class",
                    "type": "textfield"
                },
                "customId": {
                    "name": "custom ID",
                    "description": "custom ID",
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
