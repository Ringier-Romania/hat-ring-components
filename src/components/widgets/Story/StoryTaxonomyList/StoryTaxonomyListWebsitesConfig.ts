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
            "name": "Detail Taxonomy List",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "taxonomyKind": "tag",
                "listPrefix": "Tags: ",
                "links": true,
                "widgetType": "detailTaxonomyList",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "taxonomyKind": {
                    "name": "taxonomy kind",
                    "description": "kind of taxonomy to be displayed",
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
            }
        }
    }
}

