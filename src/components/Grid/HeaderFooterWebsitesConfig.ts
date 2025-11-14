export let HeaderFooterWebsitesConfig = {
    "sections": [
        {
            "title": "Header, Footer",
            "keys": [
                "headerWidgets",
                "footerWidgets"
            ],
            "groups": {
                "headerWidgets": {
                    "type": "group",
                    "name": "Header widgets",
                    "fields": [
                        "headerWidgets.container_classes",
                        "headerWidgets.widgets_above_content",
                        "headerWidgets.widgets_middle_content",
                        "headerWidgets.widgets_below_content",
                        "headerWidgets.widgets_additional_box",
                    ]
                },
                "footerWidgets": {
                    "type": "group",
                    "name": "Footer widgets",
                    "fields": [
                        "footerWidgets.container_classes",
                        "footerWidgets.widgets_above_content",
                        "footerWidgets.widgets_middle_content",
                        "footerWidgets.widgets_under_content",
                        "footerWidgets.widgets_additional_box",
                    ]
                }
            }
        }
    ],
    "defaultParams": {
        "headerWidgets": {
            "container_classes": "",
            "widgets_above_content": [],
            "widgets_middle_content": [],
            "widgets_below_content": [],
            "widgets_additional_box": [],
        },
        "footerWidgets": {
            "container_classes": "",
            "widgets_above_content": [],
            "widgets_middle_content": [],
            "widgets_under_content": [],
            "widgets_additional_box": [],
        },
    },
    "paramsDescription": {
        "headerWidgets": {
            "container_classes": {
                "name": "custom CSS class",
                "description": "custom CSS class",
                "type": "textfield"
            },
            "widgets_above_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-HEADER-MODULES-LIST",
                "name": "Top widget box (desktop & mobile)"
            },
            "widgets_middle_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-HEADER-MODULES-LIST",
                "name": "Middle widget box (desktop & mobile)"
            },
            "widgets_below_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-HEADER-MODULES-LIST",
                "name": "Bottom widget box (desktop & mobile)"
            },
            "widgets_additional_box": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-HEADER-MODULES-LIST",
                "name": "Additional widget box (desktop & mobile)"
            }
        },
        "footerWidgets": {
            "container_classes": {
                "name": "custom CSS class",
                "description": "custom CSS class",
                "type": "textfield"
            },
            "widgets_above_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-FOOTER-MODULES-LIST",
                "name": "Top widget box (desktop & mobile)"
            },
            "widgets_middle_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-FOOTER-MODULES-LIST",
                "name": "Middle widget box (desktop & mobile)"
            },
            "widgets_under_content": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-FOOTER-MODULES-LIST",
                "name": "Bottom widget box (desktop & mobile)"
            },
            "widgets_additional_box": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-FOOTER-MODULES-LIST",
                "name": "Additional widget box (desktop & mobile)"
            }
        },
    }
}
