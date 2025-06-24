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
                "nameTag": "h1",
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
                        ["linkOverlay","Link"],
                        "tagline",
                        "description",
                        ["socialProfiles", "Social profiles"],
                        ["credentials", "Credentials"],
                        ["associations",' Associations'],
                    ],
                    "required": false
                },
                "nameTag": {
                    "name": "Authors name tag",
                    "description": "Html tag for authors name",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "none"
                    ]
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                }
            }
        }
    }
}
