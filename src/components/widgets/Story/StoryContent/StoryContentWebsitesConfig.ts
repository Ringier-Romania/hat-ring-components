import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryContentWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailContent_wdg": {
            "name": "Story Content",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "standardImageWidth": "",
                "standardImageHeight": "",
                "displayFrom": "",
                "displayTo": "",
                "widgetType": "detailContent",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "standardImageWidth": {
                    "name": "Max image width",
                    "type": "textfield",
                    "description": "Maximum image width in px (empty = original)"
                },
                "standardImageHeight": {
                    "name": "Max image height",
                    "type": "textfield",
                    "description": "Maximum image height in px (empty = original)"
                },
                "displayFrom": {
                    "name": "Display blocks from",
                    "description": "1 is first, empty display all",
                    "type": "textfield"
                },
                "displayTo": {
                    "name": "Display blocks to",
                    "description": "empty is to the end",
                    "type": "textfield"
                },

            }
        }
    }
}
