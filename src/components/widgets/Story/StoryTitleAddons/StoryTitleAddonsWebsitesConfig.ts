import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryTitleAddonsWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "storyTitleAddons_wdg": {
            "name": "Story Title Addons",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "storyTitleAddons",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "titleAddonsCodeNames": {
                    "name": "Story title addons code names to show",
                    "description": "(comma separated code names)",
                    "type": "textfield"
                },
            }
        }
    }
}
