import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let TitleAddonsWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "titleAddons_wdg": {
            "name": "Title Addons",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "titleAddons",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "titleAddonsCodeNames": {
                    "name": "Title addons code names to show",
                    "description": "(comma separated code names)",
                    "type": "textfield"
                },
            }
        }
    }
}
