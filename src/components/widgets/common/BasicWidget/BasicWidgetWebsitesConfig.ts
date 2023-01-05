export let BasicWidgetWebsitesConfig = {
    "sections": [],
    "defaultParams": {
        "general": {
            "flagsOrder": "video,top,rank_1"
        }
    },
    "paramsDescription": {
        "general": {
            "flagsOrder": {
                "name": "Supported flags priority ( separated with , )",
                "description": "Show flags in this order",
                "type": "textfield"
            }
        }
    },
    "modules": {
        "basicWidget_wdg": {
            "name": "Ring Basic",
            "description": "",
            "defaultParams": {
                "platformDesktop": true,
                "platformMobile": true,
                "generalShowOptions": ["sectionElements"],
                "showOptions": ["image", "title", "publicationDate", "lead"],
                "additionalOptions": [],
                "section_name": "",
                "listElements": [],
                "customClass": "",
                "template": "basicWidget",
                "amdModule": "none",
                "customPosition": "none",
                "customWidth": "none",
                "count": 10,
                "offset": 0,
                "countBig": 0,
                "columns": 1,
                "lazyload": "enabled",
                "dedicatedStyleForWidget": "none",
                "labelValue": "",
                "headerSeoTag": "h2",
                "labelLink": "",
                "description": "",
                "moreText": "",
                "moreUrl": "",
                "customId": "",
                "customBg": "",
                "bigImageSize": "1200x660",
                "standardImageSize": "600x330",
                "listElementsImageSize": "600x330",
                "preloadImagesCount": 0,
                "mobilePreloadImagesCount": 0,
                "titleExtrasCodeNames": "",
                "alternativeTeasersCodeNames": "",
                "classificationList": "category,tag",
                "slider": "none",
                "decorators": [],
                "cache": "min",
                "onError": "abort",
                "widgetType": "basicWidget"
            },
            "paramsDescription": {
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
                "generalShowOptions": {
                    "name": "Widget elements to display",
                    "description": "",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "required": false,
                    "items": [
                        "sectionElements",
                        "listElements",
                        "header",
                        "description",
                        "button"
                    ]
                },
                "showOptions": {
                    "name": "Item elements to display",
                    "description": "",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "required": false,
                    "items": [
                        "title",
                        "lead",
                        "image",
                        "flags",
                        "publicationDate",
                        "modificationDate",
                        "taxonomies",
                        "authors",
                        "authorsImages",
                        "wrapperStart",
                        "wrapperEnd",
                        "titleExtras",
                        "alternativeTeasers",
                        "ordinalNumber"
                    ]
                },
                "additionalOptions": {
                    "name": "Additional options",
                    "description": "",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "items": ["disableCropAuto", "disableCropImage", "[Dedicated Styles] Preload", "[Dedicated Styles] Prefetch"],
                    "required": false
                },
                "section_name": {
                    "name": "Section name",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "listElements": {
                    "type": "treeobject",
                    "name": "List elements",
                    "description": "List of static elements",
                    "required": false,
                    "properties": [
                        {
                            "name": "Title",
                            "type": "textfield"
                        },
                        {
                            "name": "Text",
                            "type": "textfield"
                        },
                        {
                            "name": "Description",
                            "type": "textfield"
                        },
                        {
                            "name": "Image src",
                            "type": "textfield"
                        },
                        {
                            "name": "Image dimensions (eg. 600x300)",
                            "type": "textfield"
                        },
                        {
                            "name": "Link url",
                            "type": "textfield"
                        },
                        {
                            "name": "Custom CSS Class",
                            "type": "textfield"
                        }
                    ]
                },
                "customClass": {
                    "name": "Custom CSS class",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "template": {
                    "name": "Template type",
                    "type": "select",
                    "description": "from list",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "basicWidget"
                    ]
                },
                "amdModule": {
                    "name": "Custom AMD module",
                    "description": "from list",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "none",
                        "collapsable list elements (local/common.collapsableList)"
                    ]
                },
                "customPosition": {
                    "name": "Custom position",
                    "description": "in grid BOX",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "none",
                        "left",
                        "center",
                        "right"
                    ]
                },
                "customWidth": {
                    "name": "Custom width",
                    "description": "in grid BOX",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": ["none", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                "count": {
                    "name": "Elements",
                    "type": "textfield",
                    "description": "to display on page",
                    "required": false
                },
                "offset": {
                    "name": "Offset",
                    "type": "textfield",
                    "description": "elements to omit",
                    "required": false
                },
                "countBig": {
                    "name": "BIG elements",
                    "type": "textfield",
                    "description": "from 0 to 4",
                    "required": false
                },
                "columns": {
                    "name": "Columns",
                    "type": "textfield",
                    "description": "",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                "lazyload": {
                    "name": "Lazyload behavior",
                    "description": "Lazyload behavior elements",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "enabled",
                        "disabled",
                        "disabledFirstElement"
                    ]
                },
                "dedicatedStyleForWidget": {
                    "name": "Dedicated style for for widget",
                    "description": "Dedicated style for for widget - {selected_option}-{widgetType}.css will be loaded",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "none",
                        "standard",
                        "project",
                        "demo"
                    ]
                },
                "labelValue": {
                    "name": "Header",
                    "description": "empty field = dynamic header from page source",
                    "type": "textfield",
                    "required": false
                },
                "headerSeoTag": {
                    "name": "Header SEO tag",
                    "description": "",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "none",
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5"
                    ]
                },
                "labelLink": {
                    "name": "Header url",
                    "description": "",
                    "type": "textfield",
                    "required": false
                },
                "description": {
                    "name": "Description",
                    "description": "",
                    "type": "textfield",
                    "required": false
                },
                "moreText": {
                    "name": "Button text",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "moreUrl": {
                    "name": "Button url",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "customId": {
                    "name": "Custom CSS ID",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "customBg": {
                    "name": "Background image url or color",
                    "type": "textfield",
                    "description": "",
                    "required": false
                },
                "standardImageSize": {
                    "name": "Standard image resolution",
                    "type": "textfield",
                    "description": "empty = original, example: 600x330",
                    "required": false
                },
                "bigImageSize": {
                    "name": "Big image resolution",
                    "type": "textfield",
                    "description": "empty = original, example: 1200x660",
                    "required": false
                },
                "listElementsImageSize": {
                    "name": "List elements image resolution",
                    "type": "textfield",
                    "description": "empty = original, works with images from Ring CMS",
                    "required": false
                },
                "preloadImagesCount": {
                    "name": "Number of images that would be preloaded",
                    "type": "textfield",
                    "description": "The number should correspond to the number of pictures the user sees first after entering the page",
                    "required": false
                },
                "mobilePreloadImagesCount": {
                    "name": "Number of images that would be preloaded on mobile",
                    "type": "textfield",
                    "description": "The number should correspond to the number of pictures the user sees first after entering the page",
                    "required": false
                },
                "titleExtrasCodeNames": {
                    "name": "Title extras code names to show",
                    "description": "(comma separated code names)",
                    "type": "textfield"
                },
                "alternativeTeasersCodeNames": {
                    "name": "Alternative teasers code names to show",
                    "description": "(comma separated code names)",
                    "type": "textfield"
                },
                "classificationList": {
                    "name": "Taxonomy types",
                    "type": "textfield",
                    "description": "comma separated | in view order",
                    "required": false
                },
                "slider": {
                    "name": "Automatic slider",
                    "type": "select",
                    "description": "source",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "none",
                        "section elements",
                        "list elements"
                    ]
                },
                "decorators": {
                    "name": "Decorators",
                    "description": "",
                    "type": "select",
                    "allowBlank": true,
                    "multiSelect": true,
                    "required": false,
                    "items": []
                },
                "cache": {
                    "name": "cache",
                    "description": "value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
                    "items": [
                        "min",
                        "max"
                    ]
                },
                "onError": {
                    "name": "onError",
                    "description": "value",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "required": true,
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
