import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryMainImageWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailMainImage_wdg": {
            "name": "Story Main Image",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "standardImageSize": "920x500",
                "imageSizeMobile": "450x253",
                "widgetType": "detailMainImage"
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
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                }
            }
        }
    }
}
