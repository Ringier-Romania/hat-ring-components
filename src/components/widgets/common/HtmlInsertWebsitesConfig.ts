import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "@hatTypes/abstracts";


export let HtmlInsertWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "html_wdg": {
            "name": "Ring HTML Insert",
            "description": "",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "htmlInsert",
                "plainHtml": "",

            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "plainHtml": {
                    "name": "HTML",
                    "description": "HTML code",
                    "type": "code",
                    "required": false
                },

            }
        }
    }
}
