export let GeneralWebsitesConfig
    = {
    "sections": [
        {
            "title": "General",
            "keys": [
                "general"
            ]
        }
    ],
    "defaultParams": {
        "general": {
            "language": "en",
        },
        "defaultImage": "",
    },
    "paramsDescription": {
        "general": {
            "language": {
                "name": "Language code",
                "description": "Language translation code",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "en",
                    "pl",
                    "de",
                    "fr"
                ]
            },
            "defaultImage": {
                "name": "Default image on page",
                "description": "Default image on page",
                "type": "textfield"
            },
        }
    }
}
