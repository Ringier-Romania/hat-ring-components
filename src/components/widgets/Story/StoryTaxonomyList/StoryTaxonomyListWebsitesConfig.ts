import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryTaxonomyListWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailTaxonomyList_wdg": {
            "name": "Story Taxonomy List",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "taxonomyKind": "tag",
                "listPrefix": "Tags: ",
                "links": true,
                "widgetType": "detailTaxonomyList",
                "excludedUuids": ""
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "taxonomyKind": {
                    "name": "taxonomy kind",
                    "description": "Kind of taxonomy to be displayed, comma-separated, order matters",
                    "type": "textfield",
                    "required": true
                },
                "listPrefix": {
                    "name": "list prefix",
                    "description": "prefix displayed before the list",
                    "type": "textfield"
                },
                "links": {
                    "name": "Generate links",
                    "type": "checkbox",
                    "description": "List elements are linking to their detail pages"
                },
                "excludedUuids": {
                    "name": "Excluded Uuids",
                    "type": "textfield",
                    "description": "comma separated list"
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                },
            }
        }
    }
}

