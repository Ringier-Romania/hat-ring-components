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
                "headingSelector": "h2",
                "title": "Contents",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "contentSelector": {
                    "name": "Content container selector",
                    "description": "CSS selector of the element containing article headings (e.g. .StoryContent)",
                    "type": "textfield",
                },
                "headingSelector": {
                    "name": "Heading selector",
                    "description": "CSS selector for headings to include in table of contents (e.g. h2, h2, h3)",
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

