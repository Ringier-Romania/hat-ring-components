import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";

export let LogoWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "logo_wdg": {
            "name": "Logo",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "logoLinkLight": "",
                "overrideLink": "",
                "imageWidth": "",
                "imageHeight": "",
                "overrideTitle": "",
                "widgetType": "logo"
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "logoLinkLight": {
                    "name": "Link to light logo",
                    "description": "Override URL Link to light themed logo",
                    "type": "textfield"
                },
                "overrideLink": {
                    "name": "Override Link",
                    "description": "Link to navigate to on click",
                    "type": "textfield"
                },
                "imageWidth": {
                    "name": "Image Width",
                    "description": "Image width",
                    "type": "textfield"
                },
                "imageHeight": {
                    "name": "Image Height",
                    "description": "Image height",
                    "type": "textfield"
                },
                "overrideTitle": {
                    "name": "Override Title",
                    "description": "Title on image",
                    "type": "textfield"
                }
            }
        }
    }
}
