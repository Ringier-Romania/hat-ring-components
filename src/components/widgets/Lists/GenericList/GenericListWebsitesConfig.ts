import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let GenericListWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "genericList_wdg": {
            "name": "Ring Generic List",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "generalShowOptions": ["items"],
                "showOptions": [
                    "image",
                    "title"
                ],
                "headerText": "",
                "headerTag": "h2",
                "columns": 1,
                "paginationElements": 10,
                "postShift": 0,
                "customListUuid": "",
                "imageSize": "400x225",
                "imageSizeMobile": "",
                "preloadImagesCount": 0,
                "mobilePreloadImagesCount": 0,
                "widgetType": "genericList",
                "excludedFlags": [],
                "linkLabel": "",
                "mainSeoList": true,
                "customTeasers": []
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "generalShowOptions": {
                    "name": "Widget elements to display",
                    "description": "",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "required": false,
                    "items": [
                        "items",
                        "header",
                        "pagination"
                    ]
                },
                "showOptions": {
                    "name": "Item elements to display",
                    "description": "(whether to display the property or not)",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "items": [
                        "image",
                        "title",
                        "taxonomies",
                        "modificationTime",
                        "creationTime",
                        "lead",
                    ],
                    "required": false
                },
                "headerText": {
                    "name": "Header text",
                    "description": "",
                    "type": "textfield"
                },
                "headerTag": {
                    "name": "Header tag",
                    "description": "Html tag for header",
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
                        "h6"
                    ]
                },
                "columns": {
                    "name": "Number of columns",
                    "description": "Number of columns",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [1, 2, 3, 4],
                    "required": true
                },
                "paginationElements": {
                    "name": "Pagination after (elements count)",
                    "description": "Pagination after (elements count)",
                    "type": "textfield"
                },
                "postShift": {
                    "name": "Elements omission",
                    "description": "(number)",
                    "type": "textfield"
                },
                "customListUuid": {
                    "name": "Custom list/category",
                    "description": "uuid",
                    "type": "textfield"
                },
                "imageSize": {
                    "name": "Image resolution",
                    "type": "textfield",
                    "description": "Image resolution (empty = original), example: 600x330"
                },
                "imageSizeMobile": {
                    "name": "Mobile image resolution",
                    "type": "textfield",
                    "description": "Image resolution (empty = same as desktop), example: 600x330"
                },
                "preloadImagesCount": {
                    "name": "Number of images that would be preloaded",
                    "type": "numberfield",
                    "description": "The number should correspond to the number of pictures the user sees first after entering the page",
                    "required": false
                },
                "mobilePreloadImagesCount": {
                    "name": "Number of images that would be preloaded on mobile",
                    "type": "numberfield",
                    "description": "The number should correspond to the number of pictures the user sees first after entering the page",
                    "required": false
                },
                "excludedFlags": {
                    "type": "treeobject",
                    "name": "Excluded Flags",
                    "description": "Flags excluded from results",
                    "properties": [
                        {
                            "name": "excludedFlag",
                            "type": "textfield"
                        }
                    ]
                },
                "linkLabel": {
                    "name": "Link label",
                    "description": "",
                    "type": "textfield"
                },
                "mainSeoList": {
                    "name": "Set as main SEO list",
                    "type": "checkbox",
                    "description": "Set as main SEO list"
                },
                "customTeasers": {
                    "type": "treeobject",
                    "name": "Custom teasers",
                    "description": "",
                    "properties": [
                        {
                            "name": "Teaser code name",
                            "type": "textfield"
                        },
                        // for future
                        // {
                        //     "namnpme": "For big image",
                        //     "type": "checkbox",
                        // },
                        {
                            "name": "For mobile",
                            "type": "checkbox",
                        }
                    ]
                }
            }
        }
    }
}
