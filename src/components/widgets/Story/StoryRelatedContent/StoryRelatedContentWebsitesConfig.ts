import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";
import {GenericListWebsitesConfig} from "../../Lists/GenericList/GenericListWebsitesConfig";
import _ from "lodash";

const genericListConfig = GenericListWebsitesConfig.modules.genericList_wdg;


export let StoryRelatedContentWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "storyRelatedContent_wdg": {
            "name": "Story Related Content",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "storyRelatedContent",
                "showOptions": genericListConfig.defaultParams.showOptions,
                "relatedContentCodeName":"",
                "headerText": "",
                "headerTag": "h2",
                "columns": 1,
                "paginationElements": 10,
                "imageSize": "400x225",
                "imageSizeMobile": "",
                "excludedFlags": [],
                "linkLabel": "",
                "customTeasers": [],
                "autocomplete": false,
                "autocompleteFrom": 'firstStoryTag'
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "showOptions": genericListConfig.paramsDescription.showOptions,
                "relatedContentCodeName":{
                    "type" : "textfield",
                    "name":"Related content role code name",
                    "required": true
                },
                "headerText": genericListConfig.paramsDescription.headerText,
                "headerTag": genericListConfig.paramsDescription.headerTag,
                "columns": genericListConfig.paramsDescription.columns,
                "paginationElements": genericListConfig.paramsDescription.paginationElements,
                "imageSize": genericListConfig.paramsDescription.imageSize,
                "imageSizeMobile": genericListConfig.paramsDescription.imageSizeMobile,
                "excludedFlags": genericListConfig.paramsDescription.excludedFlags,
                "linkLabel": genericListConfig.paramsDescription.linkLabel,
                "customTeasers": genericListConfig.paramsDescription.customTeasers,
                "autocomplete": {
                    "name": "Autocomplete",
                    "type": "checkbox",
                    "description": "It will autocomplete list from rule below"
                },
                "autocompleteFrom": {
                    "name": "Autocomplete from",
                    "description": "Rule of autocompletion",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [['firstStoryTag', 'First story\'s tag ']],
                    "required": true
                },
            }
        }
    }
}
