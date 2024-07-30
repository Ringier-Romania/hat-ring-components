import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";

export let MenuWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "menu_wdg": {
            "name": "Menu",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "overrideMenuElements": [],
                "widgetType": "menu",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
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
                }
            }
        }
    }
}
