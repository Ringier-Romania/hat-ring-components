export let SEOWebsitesConfig
    = {
    "sections": [
        {
            "title": "SEO & RSS",
            "groups": {
                "seoLanguages": {
                    "type": "group",
                    "name": "Languages",
                    "fields": [
                        "seoLanguages.supportedLanguages",
                        "seoLanguages.customAlternatives",
                    ]
                },
            },
            "keys": [
                "seoLanguages"
            ]
        }
    ],
    "defaultParams": {
        "seoLanguages": {
            "supportedLanguages": [],
            "customAlternatives": [],
        },
    },
    "paramsDescription": {
        "seoLanguages": {
            "supportedLanguages": {
                "type": "treeobject",
                "name": "Supported languages",
                "description": "Languages supported in the multi-language site version (via alternate links)",
                "properties": [
                    {
                        "name": "Language code",
                        "type": "textfield"
                    },
                    {
                        "name": "Alternative role codename",
                        "type": "textfield"
                    },
                    {
                        "name": "Default language",
                        "type": "checkbox"
                    }
                ]
            },
            "customAlternatives": {
                "type": "treeobject",
                "name": "Custom alternatives",
                "description": "Custom alternate links for the current node/page",
                "properties": [
                    {
                        "name": "Language code",
                        "type": "textfield"
                    },
                    {
                        "name": "Alternative href",
                        "type": "textfield"
                    },
                    {
                        "name": "Default language",
                        "type": "checkbox"
                    }
                ]
            }
        }
    }
}
