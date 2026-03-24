import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";
import {GenericListWebsitesConfig} from "../../Lists/GenericList/GenericListWebsitesConfig";

const genericListConfig = GenericListWebsitesConfig.modules.genericList_wdg;

export let StorySimilarStoriesWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "storySimilarStories_wdg": {
            "name": "Story Similar Stories",
            "description": "Displays similar stories based on current story content",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "storySimilarStories",
                "showOptions": genericListConfig.defaultParams.showOptions,
                "headerText": "",
                "headerTag": "h2",
                "limit": 5,
                "imageSize": "400x225",
                "imageSizeMobile": "",
                "excludedFlags": [],
                "allowedKinds": [],
                "customTeasers": [],
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "showOptions": genericListConfig.paramsDescription.showOptions,
                "headerText": genericListConfig.paramsDescription.headerText,
                "headerTag": genericListConfig.paramsDescription.headerTag,
                "limit": {
                    "name": "Number of similar stories",
                    "description": "Maximum number of similar stories to display",
                    "type": "numberfield"
                },
                "imageSize": genericListConfig.paramsDescription.imageSize,
                "imageSizeMobile": genericListConfig.paramsDescription.imageSizeMobile,
                "excludedFlags": genericListConfig.paramsDescription.excludedFlags,
                "allowedKinds": {
                    "type": "treeobject",
                    "name": "Allowed Kinds",
                    "description": "Filter similar stories by kind codes (e.g., article, video). Leave empty for all kinds.",
                    "properties": [
                        {
                            "name": "kindCode",
                            "type": "textfield"
                        }
                    ]
                },
                "customTeasers": genericListConfig.paramsDescription.customTeasers,
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                },
            }
        }
    }
}

