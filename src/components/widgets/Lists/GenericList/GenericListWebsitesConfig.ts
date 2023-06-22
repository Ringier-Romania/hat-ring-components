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
                "widgetType": "genericList",
                "excludedFlags": [],
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
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
                "headerText" : {
                    "name": "Header text",
                    "description": "",
                    "type": "textfield"
                },
                "headerTag" : {
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
            }
        }
    }
}
