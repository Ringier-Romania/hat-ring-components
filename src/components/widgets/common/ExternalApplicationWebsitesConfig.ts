import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";


export let ExternalApplicationWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "external_wdg": {
            "name": "Ring External Application",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "controllerUrl": "",
                "blockName": "",
                "selector": "",
                "widgetType": "externalApplication",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
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
                }
            }
        }
    }
}
