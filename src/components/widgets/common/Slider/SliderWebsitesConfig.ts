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
                "slidesPerView": "auto",
                "autoplayDelay": 0,
                "loop": false,
                "navigation": true,
                "pagination": false,
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
                "slidesPerView": {
                    "name": "Slides per view",
                    "description": "Number of slides per view (slides visible at the same time on slider's container) or 'auto' value",
                    "type": "textfield",
                    "required": false
                },
                "autoplayDelay": {
                    "name": "Autoplay delay",
                    "description": "Delay between transitions (in ms). If this parameter is not specified (0), auto play will be disabled",
                    "type": "number",
                    "required": false
                },
                "loop": {
                    "name": "Loop",
                    "description": "Check to enable continuous loop mode",
                    "type": "checkbox",
                    "required": false
                },
                "navigation": {
                    "name": "Navigation",
                    "description": "Check to enable buttons for slider navigation",
                    "type": "checkbox",
                    "required": false
                },
                "pagination": {
                    "name": "Pagination",
                    "description": "Check to enable dots for slider",
                    "type": "checkbox",
                    "required": false
                },
            }
        }
    }
}
