import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let BreadCrumbpsWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "Breadcrumbs_wdg": {
            "name": "Breadcrumbs",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "breadcrumbs",
                "firstLevelText": "",
                "firstLevelUrl": ""
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "disable1stLevel": {
                    "name": "Disable 1st level",
                    "description": "breadcrumbs",
                    "type": "checkbox"
                },
                "firstLevelText": {
                    "name": "Custom first level text",
                    "description": "Text displayed for the first navigation level",
                    "type": "textfield"
                },
                "firstLevelUrl": {
                    "name": "Custom first level url",
                    "description": "URL address for the first level navigation item",
                    "type": "textfield"
                },
            }
        }
    }
}
