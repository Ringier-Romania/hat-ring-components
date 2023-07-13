export let SEOWebsitesConfig
    = {
    "sections": [
        {
            "title": "SEO & RSS",
            "groups": {
                "seoGeneral": {
                    "type": "group",
                    "name": "General",
                    "fields": [
                        "seoGeneral.supportedLanguages",
                    ]
                },
            },
            "keys": [
                "seoGeneral"
            ]
        }
    ],
    "defaultParams": {
        "seoGeneral": {
            "supportedLanguages": [],
        },
    },
    "paramsDescription": {
        "seoGeneral": {
            "supportedLanguages": {
                "type": "treeobject",
                "name": "Supported languages",
                "description": "Languages supported in the multi-language version ot the page (via alternate links)",
                "properties": [
                    {
                        "name": "Language code",
                        "type": "textfield"
                    },
                    {
                        "name": "Alternative role codename",
                        "type": "textfield"
                    }
                ]
            }
        }
    }
}
