export let LogoWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "logo_wdg": {
            "name": "Header logo",
            "description": "",
            "defaultParams": {
                "platformDesktop": true,
                "platformMobile": true,
                "logoLinkLight": "",
                "logoLinkDark": "",
                "overrideLink": "",
                "imageWidth": "",
                "imageHeight": "",
                "overrideTitle": "",
                "customClass": "",
                "customWidth": "none",
                "customId": "main-page-logo",
                "cache": "",
                "onError": "",
                "widgetType": "logo"
            },
            "paramsDescription": {
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
                "customClass": {
                    "name": "custom CSS class",
                    "description": "custom CSS class",
                    "type": "textfield"
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
                "customId": {
                    "name": "custom ID",
                    "description": "custom ID",
                    "type": "textfield"
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
