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
                "seoTitlesAndDescription": {
                    "type": "group",
                    "name": "SEO titles & description",
                    "fields": [
                        "seoTitlesAndDescription.homePageTitle",
                        "seoTitlesAndDescription.homePageDescription",
                        "seoTitlesAndDescription.listPageTitle",
                        "seoTitlesAndDescription.listPageDescription",
                        "seoTitlesAndDescription.listPageTitleWithNumeration",
                        "seoTitlesAndDescription.listPageDescriptionWithNumeration",
                        "seoTitlesAndDescription.topicPageTitle",
                        "seoTitlesAndDescription.topicPageDescription",
                        "seoTitlesAndDescription.topicPageTitleWithNumeration",
                        "seoTitlesAndDescription.topicPageDescriptionWithNumeration",
                        "seoTitlesAndDescription.otherPageTitle",
                        "seoTitlesAndDescription.otherPageDescription",
                        "seoTitlesAndDescription.detailPageTitle",
                        "seoTitlesAndDescription.detailPageDescription",
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
                "seoTitlesAndDescription",
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
        "seoTitlesAndDescription": {
            "homePageTitle": "{{serviceName}}",
            "homePageDescription": "{{serviceDescription}}",
            "listPageTitle": "{{nodeName}} | {{serviceName}}",
            "listPageDescription": "{{serviceDescription}}",
            "listPageTitleWithNumeration": "Page {{number}} for {{nodeName}} | {{serviceName}}",
            "listPageDescriptionWithNumeration": "Page {{number}} for {{nodeName}}. {{serviceDescription}}",
            "topicPageTitle": "{{nodeName}} | {{serviceName}}",
            "topicPageDescription": "Read the latest updates on {{topic}}. Exclusive videos, photos and more.",
            "topicPageTitleWithNumeration": "Page {{number}} for {{topicName}} | {{serviceName}}",
            "topicPageDescriptionWithNumeration": "Page {{number}} for {{topicName}}. {{serviceDescription}}",
            "otherPageTitle": "{{pageTypeName}} | {{serviceName}}",
            "otherPageDescription": "{{serviceDescription}}",
            "detailPageTitle": "| {{serviceName}}",
            "detailPageDescription": "| {{serviceName}}",
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
        "seoTitlesAndDescription": {
            "homePageTitle": {
                "name": "Home page title",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield"
            },
            "homePageDescription": {
                "name": "Home page description",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield"
            },
            "listPageTitle": {
                "name": "List page/s title",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "listPageDescription": {
                "name": "List page/s description",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "listPageTitleWithNumeration": {
                "name": "List page/s title (with numeration)",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "listPageDescriptionWithNumeration": {
                "name": "List page/s description (with numeration)",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "topicPageTitle": {
                "name": "Tag (topic) page/s title",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "topicPageDescription": {
                "name": "Tag (topic) page/s description",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "topicPageTitleWithNumeration": {
                "name": "Tag (topic) page/s title (with numeration)",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "topicPageDescriptionWithNumeration": {
                "name": "Tag (topic) page/s description (with numeration)",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "otherPageTitle": {
                "name": "Other page/s title",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "otherPageDescription": {
                "name": "Other page/s description",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "detailPageTitle": {
                "name": "Detail page/s title",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
            },
            "detailPageDescription": {
                "name": "Detail page/s description",
                "description": "Variables available to use: {{serviceName}} {{nodeName}} {{topic}} {{topicName}} {{number}} {{pageTypeName}} {{serviceDescription}}",
                "type": "textfield",
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
