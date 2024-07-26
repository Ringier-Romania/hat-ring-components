import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";

export let PhotoSwipeWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "photoswipe_wdg": {
            "name": "PhotoSwipe",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "gallerySelector": ".StoryContent ",
                "childrenSelector": ".ImageBlock a",
                "widgetType": "photoswipe"
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "gallerySelector": {
                    "name": "CSS selector for gallery",
                    "type": "textfield"
                },
                "childrenSelector": {
                    "name": "CSS selector for children",
                    "type": "textfield"
                },
            }
        }
    }
}
