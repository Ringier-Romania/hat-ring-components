import { AbstractWebsitesWidgetConfigDefaultParams, AbstractWebsitesWidgetConfigParamsDescription } from "../../../../types/abstracts";

export let PopupConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "Popup_wdg": {
            "name": "Popup",
            "description": "Configurable popup widget.",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "popup",
                "querySelector": "",
                "onClickquerySelector": "",
                "desktopPopupSize": "",
                "mobilePopupSize": "",
                "scrollPercent": "",
                "oncePerSession": false,
                "customPopupBehavior": "openPopup();"
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "querySelector": {
                    "name": "Query selector",
                    "description": "Query selector of the container whose content will be moved to the popup.",
                    "type": "textfield",
                    "required": true
                },
                "onClickquerySelector": {
                    "name": "On click query selector",
                    "description": "Query selector for the element that triggers the popup on click.",
                    "type": "textfield",
                    "required": false
                },
                "desktopPopupSize": {
                    "name": "Desktop popup size",
                    "description": "Example: 800x600, 20%x30%, 20vwx30vh. You can also specify just width (e.g., 800) or just height (e.g., x600).",
                    "type": "textfield",
                    "required": false
                },
                "mobilePopupSize": {
                    "name": "Mobile popup size",
                    "description": "Example: 300x400, 80%x60%, 80vwx60vh. You can also specify just width (300) or just height (x400).",
                    "type": "textfield",
                    "required": false
                },
                "scrollPercent": {
                    "name": "Show on scroll %",
                    "description": "Show popup after scrolling this percentage of the page (0-100).",
                    "type": "numberfield"
                },
                "oncePerSession": {
                    "name": "Once per session",
                    "description": "Show popup only once per session.",
                    "type": "checkbox"
                },
                "customPopupBehavior": {
                    "name": "JavaScript expression to trigger the popup",
                    "description": "To trigger popup use the function `openPopup();`",
                    "type": "code",
                },
            }
        }
    }
};
