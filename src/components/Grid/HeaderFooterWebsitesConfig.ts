export let HeaderFooterWebsitesConfig = {
    "sections": [
        {
            "title": "Header, Footer",
            "keys": [
                "header",
                "headerWidgets",
                "footer",
                "footerWidgets"
            ],
            "groups": {
                "header": {
                    "type": "group",
                    "name": "HEADER",
                    "fields": [
                        "header.headerBackground",
                        "header.menuElements",
                        "header.customClass"
                    ]
                },
                "headerWidgets": {
                    "type": "group",
                    "name": "Widgets",
                    "fields": [
                        "headerWidgets.widgets_above_content",
                        "headerWidgets.widgets_middle_content",
                        "headerWidgets.widgets_below_content"
                    ]
                },
                "footer": {
                    "type": "group",
                    "name": "Footer",
                    "fields": [
                        "footer.customClass"
                    ]
                },
                "footerWidgets": {
                    "type": "group",
                    "name": "Widgets",
                    "fields": [
                        "footerWidgets.widgets_above_content",
                        "footerWidgets.widgets_middle_content",
                        "footerWidgets.widgets_under_content"
                    ]
                }
            }
        }
    ],
    "defaultParams": {
        "header": {
            "headerBackground": "",
            "menuElements": [],
            "customClass": ""
        },
        "headerWidgets": {
            "widgets_above_content": [],
            "widgets_middle_content": [],
            "widgets_below_content": []
        },
        "footer": {
            "customClass": ""
        },
        "footerWidgets": {
            "widgets_above_content": [],
            "widgets_middle_content": [],
            "widgets_under_content": []
        }
    },
    "paramsDescription": {
        "header": {
            "headerBackground": {
                "name": "Custom header background (name or HEX)",
                "description": "Custom header background (name or HEX)",
                "type": "textfield"
            },
            "menuElements": {
                "type": "treeobject",
                "name": "Menu elements",
                "description": "Default navigation menu elements",
                "properties": [
                    {
                        "name": "url",
                        "type": "textfield"
                    },
                    {
                        "name": "path",
                        "type": "textfield"
                    },
                    {
                        "name": "hidden",
                        "type": "checkbox"
                    },
                    {
                        "name": "open in new tab",
                        "type": "checkbox"
                    },
                    {
                        "name": "custom css class",
                        "type": "textfield"
                    },
                    {
                        "name": "image url",
                        "type": "textfield"
                    }
                ]
            },
            "customClass": {
                "name": "custom CSS class",
                "description": "custom CSS class",
                "type": "textfield"
            }
        },
        "headerWidgets": {
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
            }
        },
        "footer": {
            "menuElements": {
                "type": "treeobject",
                "name": "Menu elements",
                "description": "Default navigation menu elements",
                "properties": [
                    {
                        "name": "url",
                        "type": "textfield"
                    },
                    {
                        "name": "path",
                        "type": "textfield"
                    },
                    {
                        "name": "hidden",
                        "type": "checkbox"
                    },
                    {
                        "name": "custom css class",
                        "type": "textfield"
                    }
                ]
            },
            "customClass": {
                "name": "custom CSS class",
                "description": "custom CSS class",
                "type": "textfield"
            }
        },
        "footerWidgets": {
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
            }
        }
    }
}
