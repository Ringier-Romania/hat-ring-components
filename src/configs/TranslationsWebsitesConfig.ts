export let TranslationsWebsitesConfig
    = {
    "sections": [
        {
            "title": "Translations",
            "keys": [
                "translations"
            ]
        }
    ],
    "defaultParams": {
        "translations": {
            "translationMap": [],
        },
    },
    "paramsDescription": {
        "translations": {
            "translationMap": {
                "type": "treeobject",
                "name": "Translations",
                "properties": [
                    {
                        "name": "language",
                        "type": "textfield"
                    },
                    {
                        "name": "source",
                        "type": "textfield"
                    },
                    {
                        "name": "translation",
                        "type": "textfield"
                    }
                ]
            },
        }
    }
}
