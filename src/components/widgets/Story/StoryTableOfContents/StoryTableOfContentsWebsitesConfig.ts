import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription
} from "../../../../types/abstracts";

export let StoryTableOfContentsWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "storyTableOfContents_wdg": {
            "name": "Story Table of Contents",
            "description": "Renders a scrollspy table of contents built from H2 headings in the article content",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "StoryTableOfContents",
                "contentSelector": ".StoryContent",
                "title": "Contents",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "contentSelector": {
                    "name": "Content container selector",
                    "description": "CSS selector of the element containing article H2 headings (e.g. .StoryContent)",
                    "type": "textfield",
                },
                "title": {
                    "name": "Widget heading",
                    "description": "Heading displayed above the table of contents",
                    "type": "textfield",
                },
            },
        },
    },
};

