import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";

export let StoryTitleWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailTitle_wdg": {
            "name": "Story Title",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "detailTitle",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
            }
        }
    }
}
