import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryDateWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "detailArticleDate_wdg": {
            "name": "Story Date",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "detailArticleDate",
                "dateFormat": "",
                "dateTypes": [
                    "modificationTimeOrCreationTime"
                ],
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "widgetType": {
                    "name": "widgetType",
                    "description": "widget type",
                    "type": "textfield",
                    "required": true
                },
                "dateFormat": {
                    "name": "Custom date format",
                    "description": "from moment.js library",
                    "type": "textfield"
                },
                "dateType": {
                    "name": "Date type",
                    "description": "Select date type to be displayed",
                    "type": "select",
                    "allowBlank": false,
                    "multiSelect": false,
                    "items": [
                        "modificationTime",
                        "creationTime",
                        "lastPublicationDate",
                    ],
                    "required": true
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield"
                }
            }
        }
    }
}


