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
                "showLinkToImage": "false",
                "imageResizeCropMode": "cover",
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
                "showLinkToImage": {
                    "name": "Show link to image",
                    "type": "checkbox",
                    "description": "When checked, the image will link to the image page or open in a lightbox after proper configuration"
                },
                "imageResizeCropMode": {
                    "name": "Image resize crop mode",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        ["cover", "Cover - Fill whole box with image, cropping if necessary"],
                        ["contain", "Contain - Fit image within box, scaling image to fit without cropping"],
                    ],
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
