import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let SliderWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "slider_wdg": {
            "name": "Slider",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "slider",
                "slides": [],
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "slides": {
                    "type": "treeobject",
                    "name": "Slides",
                    "description": "slides",
                    "properties": [
                        {
                            "name": "Title",
                            "type": "textfield"
                        },
                        {
                            "name": "Description",
                            "type": "textfield"
                        },
                        {
                            "name": "Link url",
                            "type": "textfield"
                        },
                        {
                            "name": "Source url",
                            "type": "textfield"
                        },
                        {
                            "name": "Source type",
                            "description": "Source type",
                            "type": "select",
                            "allowBlank": false,
                            "multiSelect": false,
                            "items": [
                                "Image"
                            ]
                        },
                        {
                            "name": "Source desktop dimensions(eg. 600x300)",
                            "type": "textfield"
                        },
                        {
                            "name": "Source mobile dimensions(eg. 600x300)",
                            "type": "textfield"
                        },
                        {
                            "name": "Custom CSS Class",
                            "type": "textfield"
                        },
                    ]
                },
            }
        }
    }
}
