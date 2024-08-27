import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryFrameWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "storyFrame_wdg": {
            "name": "Story Frame",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "storyFrame",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                },
                "frameCodeName": {
                    "name": "Frame code name",
                    "type": "textfield",
                    "description": "Frame code name"
                },
            }
        }
    }
}


