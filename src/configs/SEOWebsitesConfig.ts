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
                        "seoSettings.homepageNodeIds",
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
                        "seoTitlesAndDescription.searchPageTitle",
                        "seoTitlesAndDescription.searchPageDescription",
                        "seoTitlesAndDescription.otherPageTitle",
                        "seoTitlesAndDescription.otherPageDescription",
                        "seoTitlesAndDescription.authorPageTitle",
                        "seoTitlesAndDescription.authorPageDescription",
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
                        "rssDefault.excludedFlags",
                        "rssDefault.excludedCategoryIds",
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
                },
                "contentLinks": {
                    "type": "group",
                    "name": "Content Link Settings",
                    "fields": [
                        "contentLinks.enableDomainWhitelist",
                        "contentLinks.whitelistedDomains"
                    ]
                }
            },
            "keys": [
                "seoSettings",
                "seoTitlesAndDescription",
                "seoLanguages",
                "rssDefault",
                "seoOpenGraph",
                "metaData",
                "contentLinks"
            ]
        }
    ],
    "defaultParams": {
        "seoSettings": {
            "defaultArticleAuthor": "",
            "defaultArticleAuthorEmail": "",
            "homepageNodeIds": "",
        },
        "seoTitlesAndDescription": {
            "homePageTitle": "{{siteName}}",
            "homePageDescription": "{{siteDescription}}",
            "listPageTitle": "{{nodeName}} | {{siteName}}",
            "listPageDescription": "{{currentDescription}}",
            "listPageTitleWithNumeration": "Page {{number}} for {{nodeName}} | {{siteName}}",
            "listPageDescriptionWithNumeration": "Page {{number}} for {{nodeName}}. {{currentDescription}}",
            "topicPageTitle": "{{nodeName}} | {{siteName}}",
            "topicPageDescription": "Read the latest updates on exclusive videos, photos and more.",
            "topicPageTitleWithNumeration": "Page {{number}} for {{siteName}}",
            "topicPageDescriptionWithNumeration": "Page {{number}} for {{topicName}}. {{currentDescription}}",
            "searchPageTitle": "{{searchPhrase}} - search results | {{siteName}}",
            "searchPageDescription": "Read the latest articles about {{searchPhrase}}.",
            "otherPageTitle": "{{pageTypeName}} | {{siteName}}",
            "otherPageDescription": "{{currentDescription}}",
            "authorPageTitle": "{{authorName}} | {{siteName}}",
            "authorPageDescription": "{{authorName}}. {{currentDescription}}",
            "detailPageTitle": "{{currentTitle}} | {{siteName}}",
            "detailPageDescription": "{{currentDescription}} | {{siteName}}",
        },
        "seoLanguages": {
            "supportedLanguages": [],
            "customAlternatives": [],
        },
        "rssDefault": {
            "rssType": "RSS 2.0 feed",
            "limit": 10,
            "excludedFlags": [],
            "excludedCategoryIds": [],
        },
        "seoOpenGraph": {
            "imageSizesDesktop": "1200x630",
            "imageSizesMobile": "1200x630",
        },
        "metaData": {
            "customMetaTags": []
        },
        "contentLinks": {
            "enableDomainWhitelist": false,
            "whitelistedDomains": []
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
            "homepageNodeIds": {
                "name": "Homepage node IDs for SEO purposes - separated by commas",
                "description": "In cases where the homepage is not the root node of the site, you can specify the node IDs here. This is useful when a child node should be treated as the homepage for SEO purposes.",
                "type": "textfield"
            },
        },
        "seoTitlesAndDescription": {
            "homePageTitle": {
                "name": "Home page title",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield"
            },
            "homePageDescription": {
                "name": "Home page description",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield"
            },
            "listPageTitle": {
                "name": "List page/s title",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "listPageDescription": {
                "name": "List page/s description",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "listPageTitleWithNumeration": {
                "name": "List page/s title (with numeration)",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "listPageDescriptionWithNumeration": {
                "name": "List page/s description (with numeration)",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "topicPageTitle": {
                "name": "Tag (topic) page/s title",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "topicPageDescription": {
                "name": "Tag (topic) page/s description",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "topicPageTitleWithNumeration": {
                "name": "Tag (topic) page/s title (with numeration)",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "topicPageDescriptionWithNumeration": {
                "name": "Tag (topic) page/s description (with numeration)",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "searchPageTitle": {
                "name": "Search page title",
                "description": "Variables available to use: {{searchPhrase}} {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "searchPageDescription": {
                "name": "Search page description",
                "description": "Variables available to use: {{searchPhrase}} {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "otherPageTitle": {
                "name": "Other page/s title",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "otherPageDescription": {
                "name": "Other page/s description",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "authorPageTitle": {
                "name": "Author page/s title",
                "description": "Variables available to use: {{authorName}} {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "authorPageDescription": {
                "name": "Author page/s description",
                "description": "Variables available to use: {{authorName}} {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "detailPageTitle": {
                "name": "Detail page/s title",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
                "type": "textfield",
            },
            "detailPageDescription": {
                "name": "Detail page/s description",
                "description": "Variables available to use: {{siteName}} {{siteDescription}} {{currentTitle}} {{currentDescription}} {{nodeName}} {{number}} {{pageTypeName}}",
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
            "excludedFlags": {
                "type": "treeobject",
                "name": "Excluded Flags",
                "description": "Flags excluded from rss",
                "properties": [
                    {
                        "name": "excludedFlag",
                        "type": "textfield"
                    }
                ]
            },
            "excludedCategoryIds": {
                "type": "treeobject",
                "name": "Excluded category IDs",
                "description": "Categories excluded from RSS",
                "properties": [
                    {
                        "name": "excludedCategoryId",
                        "type": "textfield"
                    }
                ]
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
                       "description": "Tag values separated by commas",
                       "type": "textfield"
                   }
               ]
           }
       },
       "contentLinks": {
            "enableDomainWhitelist": {
                "name": "Enable domain whitelist for content links",
                "type": "checkbox"
            },
            "whitelistedDomains": {
                "type": "treeobject",
                "name": "Whitelisted domains",
                "description": "List of whitelisted domains. All links from content outside this list will have 'nofollow'.",
                "properties": [
                    {
                        "name": "domain",
                        "description": "Domain name (e.g., example.com, example.xy.com)",
                        "type": "textfield"
                    },
                    {
                        "name": "relAttribute",
                        "description": "Rel attribute value for this domain (leave empty for default), e.g., noreferrer, noopener",
                        "type": "textfield"
                    }
                ]
            }
       }
    }
}
