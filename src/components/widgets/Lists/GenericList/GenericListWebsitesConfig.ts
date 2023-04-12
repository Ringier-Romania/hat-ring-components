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
                "showOptions": [
                    "image",
                    "title",
                    "lead",
                    "publicationDate"
                ],
                "headerText": "",
                "headerTag": "h2",
                "columns": 1,
                "paginationElements": 10,
                "postShift": 0,
                "customListUuid": "",
                "customClass": "genericList",
                "customPosition": "none",
                "customWidth": "none",
                "imageSize": "400x225",
                "imageSizeMobile": "",
                "platformDesktop": true,
                "platformMobile": true,
                "cache": "",
                "onError": "",
                "widgetType": "genericList"
            },
            "paramsDescription": {
                "showOptions": {
                    "name": "Item elements to display",
                    "description": "(whether to display the property or not)",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "items": [
                        "image",
                        "title",
                        "flags",
                        "lead",
                        "publicationDate",
                        "modificationDate",
                        "authors",
                        "wrapperStart",
                        "wrapperEnd",
                        "titleExtras",
                        "taxonomies",
                        "category",
                        "alternativeTeasers"
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
                "customClass": {
                    "name": "custom CSS class",
                    "description": "custom CSS class",
                    "type": "textfield",
                    "required": true
                },
                "customPosition": {
                    "name": "Custom position",
                    "description": "(widget in BOX)",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none",
                        "left",
                        "center",
                        "right"
                    ]
                },
                "customWidth": {
                    "name": "Custom width",
                    "description": "(widget in BOX)",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": ["none", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    "required": false
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
                "showTotalElements": {
                    "name": "Display total elements",
                    "type": "checkbox"
                },
                "platformDesktop": {
                    "name": "Desktop",
                    "type": "checkbox",
                    "description": "Desktop"
                },
                "platformMobile": {
                    "name": "Mobile",
                    "type": "checkbox",
                    "description": "Mobile"
                },
                "cache": {
                    "name": "cache",
                    "description": "cache value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none",
                        "min",
                        "mdm",
                        "max"
                    ]
                },
                "onError": {
                    "name": "onError",
                    "description": "onError value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "discard",
                        "abort"
                    ]
                },
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                }
            }
        }
    }
}
