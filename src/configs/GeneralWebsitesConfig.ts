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
            "siteName": "",
            "siteDescription": "",
            "homepageURL": "",
            "defaultImage": "",
        },
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
            "siteName": {
                "name": "Site name",
                "description": "Site name",
                "type": "textfield"
            },
            "siteDescription": {
                "name": "Site description",
                "description": "Site description",
                "type": "textfield"
            },
            "siteContactNumber": {
                "name": "Site contact number",
                "description": "Site contact number",
                "type": "textfield"
            },
            "siteLogo": {
                "name": "Site logo",
                "description": "Site logo",
                "type": "textfield"
            },
            "homepageURL": {
                "name": "Homepage URL",
                "description": "Full homepage URL (without / at the end of URL)",
                "type": "textfield"
            },
            "defaultImage": {
                "name": "Default image on page",
                "description": "Default image on page",
                "type": "textfield"
            },
        }
    }
}
