import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let SimpleHeadingWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "simpleHeading_wdg": {
            "name": "Simple Heading",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "simpleHeading",
                "headingTag": "h2",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "headingText": {
                    "name": "Heading",
                    "description": "Heading text",
                    "type": "textfield",
                    "required": false
                },
                "headingTag": {
                    "name": "Heading tag",
                    "description": "",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "div",
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6"
                    ]
                },
            }
        }
    }
}
