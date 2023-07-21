export let RingDataLayerWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "ringDataLayer_wdg": {
            "name": "ringDataLayer",
            "description": "",
            "defaultParams": {
                "widgetType": "ringDataLayer",
                "platformDesktop": true,
                "platformMobile": true,
                "mode": "static",
                "target": "",
            },
            "paramsDescription": {
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
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
            }
        }
    }
}
