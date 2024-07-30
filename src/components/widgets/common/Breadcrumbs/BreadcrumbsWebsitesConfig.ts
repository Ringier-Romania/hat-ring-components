import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";

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
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
            }
        }
    }
}
