import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let SingleImageWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "singleImage_wdg": {
            "name": "Single image",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "imageSrc": "",
                "imageSize": "",
                "imageAlt": "",
                "linkUrl": "",
                "additionalOptions": [],
                "widgetType": "singleImage"
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "imageSrc": {
                    "name": "Image src",
                    "description": "Image src",
                    "type": "textfield"
                },
                "imageSize": {
                    "name": "Image resolution",
                    "type": "textfield",
                    "description": "Image resolution (empty = original), example: 600x330"
                },
                "mobileImageSrc": {
                    "name": "Mobile image src",
                    "description": "Mobile image src",
                    "type": "textfield"
                },
                "mobileImageSize": {
                    "name": "Mobile image resolution",
                    "type": "textfield",
                    "description": "Image resolution (empty = original), example: 600x330"
                },
                "imageAlt": {
                    "name": "Image alt attribute",
                    "type": "textfield",
                    "description": "Image alt attribute for SEO"
                },
                "linkUrl": {
                    "name": "Link url",
                    "type": "textfield",
                    "description": "Open link when image was clicked"
                },
                "additionalOptions": {
                    "name": "Options",
                    "description": "Options",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "items": [
                        ["openLinkAsExternal", "Open link as external"],
                        ["openLinkInNewTab", "Open link in new a tab"]
                    ],
                    "required": false
                },
            }
        }
    }
}
