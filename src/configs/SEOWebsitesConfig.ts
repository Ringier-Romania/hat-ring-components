export let SEOWebsitesConfig
    = {
    "sections": [
        {
            "title": "SEO & RSS",
            "groups": {
                "seoGroup": {
                    "type": "group",
                    "name": "SEO general settings",
                    "fields": [
                        "seoSettings.defaultArticleAuthor",
                        "seoSettings.defaultArticleAuthorEmail",
                    ]
                },
                "seoLanguages": {
                    "type": "group",
                    "name": "Languages",
                    "fields": [
                        "seoLanguages.supportedLanguages",
                        "seoLanguages.customAlternatives",
                    ]
                },
                "rssDefaultGroup": {
                    "type": "group",
                    "name": "RSS default feed settings",
                    "fields": [
                        "rssDefault.rssType",
                        "rssDefault.limit",
                    ]
                },
                "seoOpenGraph": {
                    "type": "group",
                    "name": "Open Graph",
                    "fields": [
                        "seoOpenGraph.imageSizesDesktop",
                        "seoOpenGraph.imageSizesMobile"
                    ]
                },
                "metaData": {
                    "type": "group",
                    "name": "Meta data",
                    "fields": [
                        "metaData.customMetaTags"
                    ]
                }
            },
            "keys": [
                "seoSettings",
                "seoLanguages",
                "rssDefault",
                "seoOpenGraph",
                "metaData"
            ]
        }
    ],
    "defaultParams": {
        "seoSettings": {
            "defaultArticleAuthor": "",
            "defaultArticleAuthorEmail": "",
        },
        "seoLanguages": {
            "supportedLanguages": [],
            "customAlternatives": [],
        },
        "rssDefault": {
            "rssType": "RSS 2.0 feed",
            "limit": 10,
        },
        "seoOpenGraph": {
            "imageSizesDesktop": "",
            "imageSizesMobile": ""
        },
        "metaData": {
            "customMetaTags": []
        }
    },
    "paramsDescription": {
        "seoSettings": {
            "defaultArticleAuthor": {
                "name": "Default author name (used when article author is missing)",
                "description": "",
                "type": "textfield"
            },
            "defaultArticleAuthorEmail": {
                "name": "Default author e-mail address (used when article author is missing)",
                "description": "",
                "type": "textfield"
            },
        },
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
        },
        "rssDefault": {
            "rssType": {
                "name": "RSS feed type",
                "description": "",
                "type": "select",
                "multiSelect": false,
                "items": [
                    "RSS Atom 1.0 feed",
                    "RSS 2.0 feed",
                ]
            },
            "limit": {
                "name": "Limit",
                "description": "",
                "type": "numberfield"
            },
        },
        "seoOpenGraph": {
            "imageSizesDesktop": {
                "name": "Desktop image sizes (x separated)",
                "description": "Open Graph desktop image sizes (x separated)",
                "type": "textfield"
            },
            "imageSizesMobile": {
                "name": "Mobile image sizes (x separated)",
                "description": "Open Graph mobile image sizes (x separated)",
                "type": "textfield"
            }
        },
       "metaData": {
           "customMetaTags": {
               "type": "treeobject",
               "name": "Custom meta tags",
               "description": "Custom meta tags - for example robots",
               "properties": [
                   {
                       "name": "SiteContentType: all, homepage, Author, CustomAction, SiteNode, Source, Story, Topic, uuid of taxonomy, etc.",
                       "type": "header"
                   },
                   {
                       "name": "metaTag",
                       "type": "textfield"
                   },
                   {
                       "name": "siteContentType",
                       "type": "textfield"
                   },
                   {
                       "name": "tagValue",
                       "type": "textfield"
                   }
               ]
           }
       }
    }
}
