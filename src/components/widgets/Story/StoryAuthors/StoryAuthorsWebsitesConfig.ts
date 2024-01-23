import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryAuthorsWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "StoryAuthors_wdg": {
            "name": "Story Authors",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "standardImageSize": "300x300",
                "imageSizeMobile": "300x300",
                "showOptions": [
                    "name",
                    "linkOverlay"
                ],
                "widgetType": "storyAuthors",
            },
            "paramsDescription": {
               ...AbstractWebsitesWidgetConfigParamsDescription,
                "standardImageSize": {
                    "name": "Standard image resolution",
                    "type": "textfield",
                    "description": "Standard image resolution (empty = original), example: 920x500"
                },
                "imageSizeMobile": {
                    "name": "Mobile image resolution",
                    "type": "textfield",
                    "description": "Mobile image resolution (empty = original), example: 450x253"
                },
                "showOptions": {
                    "name": "Item elements to display",
                    "description": "(whether to display the property or not)",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "items": [
                        "image",
                        "name",
                        "linkOverlay",
                        "tagline",
                        "description",
                        "socialProfiles"
                    ],
                    "required": false
                },
            }
        }
    }
}
