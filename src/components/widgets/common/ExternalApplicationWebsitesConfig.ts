export let ExternalApplicationWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "external_wdg": {
            "name": "Ring External Application",
            "description": "",
            "defaultParams": {
                "widgetType": "externalApplication",
                "platformDesktop": true,
                "platformMobile": true,
                "controllerUrl": "",
                "blockName": "",
                "selector": "",
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
                "controllerUrl": {
                    "name": "Controller URL",
                    "description": "Controller URL",
                    "type": "textfield",
                    "required": true
                },
                "blockName": {
                    "name": "Block name",
                    "description": "Block name",
                    "type": "textfield",
                    "required": false
                },
                "selector": {
                    "name": "Query selector",
                    "description": "Query selector to fetch element e.g. div.myElement. When blockName is set it does not work",
                    "type": "textfield",
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
