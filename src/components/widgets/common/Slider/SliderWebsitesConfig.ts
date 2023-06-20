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
                "centeredSlides": false,
                "breakpoints": []
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "slides": {
                    "type": "treeobject",
                    "name": "Slides",
                    "description": "",
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
                    "type": "numberfield",
                    "required": false
                },
                "loop": {
                    "name": "Loop",
                    "description": "Check to enable continuous loop mode. Because of nature of how the loop mode works (it will rearrange slides), total number of slides must be >= 'Slides per view' * 2",
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
                "centeredSlides": {
                    "name": "Centered slides",
                    "description": "If true, then active slide will be centered, not always on the left side.",
                    "type": "checkbox",
                    "required": false
                },
                "breakpoints": {
                    "type": "treeobject",
                    "name": "Breakpoints",
                    "description": "Allows to set different parameter for different responsive breakpoints (screen sizes).",
                    "properties": [
                        {
                            "name": "Minimal screen size",
                            "type": "textfield"
                        }, {
                            "name": "Slides per view",
                            "type": "textfield"
                        }
                    ]
                },
            }
        }
    }
}
