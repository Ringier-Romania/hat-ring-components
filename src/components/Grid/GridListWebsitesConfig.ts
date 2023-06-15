export let GridListsWebsitesConfig = {
    "sections": [
        {
            "title": "Lists",
            "keys": [
                "ListExtendedWidgets1",
                "ListExtendedWidgets2"
            ],
            "groups": {
                "group4": {
                    "type": "group",
                    "name": "Extended configuration - Container 1",
                    "fields": [
                        "ListExtendedWidgets1.container_order",
                        "ListExtendedWidgets1.container_name",
                        "ListExtendedWidgets1.container_url",
                        "ListExtendedWidgets1.container_html_tag",
                        "ListExtendedWidgets1.container_section_html_tag",
                        "ListExtendedWidgets1.container_name_hide",
                        "ListExtendedWidgets1.container_hide",
                        "ListExtendedWidgets1.container_classes",
                        "ListExtendedWidgets1.box_top",
                        "ListExtendedWidgets1.box_top_size",
                        "ListExtendedWidgets1.box_top_html_tag",
                        "ListExtendedWidgets1.box_top_hide",
                        "ListExtendedWidgets1.box_left",
                        "ListExtendedWidgets1.box_left_size",
                        "ListExtendedWidgets1.box_left_html_tag",
                        "ListExtendedWidgets1.box_left_hide",
                        "ListExtendedWidgets1.box_middle",
                        "ListExtendedWidgets1.box_middle_size",
                        "ListExtendedWidgets1.box_middle_html_tag",
                        "ListExtendedWidgets1.box_middle_hide",
                        "ListExtendedWidgets1.box_right",
                        "ListExtendedWidgets1.box_right_size",
                        "ListExtendedWidgets1.box_right_html_tag",
                        "ListExtendedWidgets1.box_right_hide",
                        "ListExtendedWidgets1.box_bottom",
                        "ListExtendedWidgets1.box_bottom_size",
                        "ListExtendedWidgets1.box_bottom_html_tag",
                        "ListExtendedWidgets1.box_bottom_hide"
                    ]
                },
                "group5": {
                    "type": "group",
                    "name": "Extended configuration - Container 2",
                    "fields": [
                        "ListExtendedWidgets2.container_order",
                        "ListExtendedWidgets2.container_name",
                        "ListExtendedWidgets2.container_url",
                        "ListExtendedWidgets2.container_html_tag",
                        "ListExtendedWidgets2.container_section_html_tag",
                        "ListExtendedWidgets2.container_name_hide",
                        "ListExtendedWidgets2.container_hide",
                        "ListExtendedWidgets2.container_classes",
                        "ListExtendedWidgets2.box_top",
                        "ListExtendedWidgets2.box_top_size",
                        "ListExtendedWidgets2.box_top_html_tag",
                        "ListExtendedWidgets2.box_top_hide",
                        "ListExtendedWidgets2.box_left",
                        "ListExtendedWidgets2.box_left_size",
                        "ListExtendedWidgets2.box_left_html_tag",
                        "ListExtendedWidgets2.box_left_hide",
                        "ListExtendedWidgets2.box_middle",
                        "ListExtendedWidgets2.box_middle_size",
                        "ListExtendedWidgets2.box_middle_html_tag",
                        "ListExtendedWidgets2.box_middle_hide",
                        "ListExtendedWidgets2.box_right",
                        "ListExtendedWidgets2.box_right_size",
                        "ListExtendedWidgets2.box_right_html_tag",
                        "ListExtendedWidgets2.box_right_hide",
                        "ListExtendedWidgets2.box_bottom",
                        "ListExtendedWidgets2.box_bottom_size",
                        "ListExtendedWidgets2.box_bottom_html_tag",
                        "ListExtendedWidgets2.box_bottom_hide"
                    ]
                }
            }
        }
    ],
    "defaultParams": {
        "ListExtendedWidgets1": {
            "container_order": "1",
            "container_name": false,
            "container_url": false,
            "container_html_tag": "div",
            "container_section_html_tag": "section",
            "container_name_hide": false,
            "container_classes": "",
            "container_hide": false,
            "box_top_full": false,
            "box_bottom_full": false,
            "container_full": false,
            "box_top": [],
            "box_top_size": "12",
            "box_top_html_tag": "aside",
            "box_left": [],
            "box_left_size": "3",
            "box_left_html_tag": "div",
            "box_middle": [],
            "box_middle_size": "6",
            "box_middle_html_tag": "div",
            "box_right": [],
            "box_right_size": "3",
            "box_right_html_tag": "div",
            "box_bottom": [],
            "box_bottom_size": "12",
            "box_bottom_html_tag": "aside"
        },
        "ListExtendedWidgets2": {
            "container_order": "2",
            "container_name": false,
            "container_url": false,
            "container_html_tag": "div",
            "container_section_html_tag": "section",
            "container_name_hide": false,
            "container_classes": "",
            "container_hide": false,
            "box_top_full": false,
            "box_bottom_full": false,
            "container_full": false,
            "box_top": [],
            "box_top_size": "12",
            "box_top_html_tag": "aside",
            "box_left": [],
            "box_left_size": "3",
            "box_left_html_tag": "div",
            "box_middle": [],
            "box_middle_size": "6",
            "box_middle_html_tag": "div",
            "box_right": [],
            "box_right_size": "3",
            "box_right_html_tag": "div",
            "box_bottom": [],
            "box_bottom_size": "12",
            "box_bottom_html_tag": "aside"
        }
    },
    "paramsDescription": {
        "ListExtendedWidgets1": {
            "container_order": {
                "name": "Order",
                "description": "Order",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ]
            },
            "container_name": {
                "name": "Container name",
                "description": "Container name",
                "type": "textfield"
            },
            "container_url": {
                "name": "Container url",
                "description": "Container url",
                "type": "textfield"
            },
            "container_html_tag": {
                "name": "Container HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "container_section_html_tag": {
                "name": "Section HTML tag (top box, left box, middle box) wrapper",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "container_name_hide": {
                "name": "Container - hide name on page",
                "description": "Container - hide name on page",
                "type": "checkbox"
            },
            "container_classes": {
                "name": "Container CSS custom classes",
                "description": "Container CSS custom classes",
                "type": "textfield"
            },
            "container_hide": {
                "name": "Container - hide on page",
                "description": "Container - hide on page",
                "type": "checkbox"
            },
            "box_top_full": {
                "name": "TOP BOX - full page width",
                "description": "TOP BOX - full page width",
                "type": "checkbox"
            },
            "box_bottom_full": {
                "name": "BOTTOM BOX - full page width",
                "description": "BOTTOM BOX - full page width",
                "type": "checkbox"
            },
            "container_full": {
                "name": "Container - full page width",
                "description": "Container - full page width",
                "type": "checkbox"
            },
            "box_top": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "TOP BOX (desktop & mobile)"
            },
            "box_top_size": {
                "name": "TOP BOX - custom width",
                "description": "TOP BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_top_html_tag": {
                "name": "TOP BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_top_hide": {
                "name": "TOP BOX - hide on page",
                "description": "TOP BOX - hide on page",
                "type": "checkbox"
            },
            "box_left": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "LEFT BOX (desktop & mobile)"
            },
            "box_left_size": {
                "name": "LEFT BOX - custom width",
                "description": "LEFT BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_left_html_tag": {
                "name": "LEFT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_left_hide": {
                "name": "LEFT BOX - hide on page",
                "description": "LEFT BOX - hide on page",
                "type": "checkbox"
            },
            "box_middle": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "MIDDLE BOX (desktop & mobile)"
            },
            "box_middle_size": {
                "name": "MIDDLE BOX - custom width",
                "description": "MIDDLE BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_middle_html_tag": {
                "name": "MIDDLE BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_middle_hide": {
                "name": "MIDDLE BOX - hide on page",
                "description": "MIDDLE BOX - hide on page",
                "type": "checkbox"
            },
            "box_right": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "RIGHT BOX (desktop & mobile)"
            },
            "box_right_size": {
                "name": "RIGHT BOX - custom width",
                "description": "RIGHT BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_right_html_tag": {
                "name": "RIGHT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_right_hide": {
                "name": "RIGHT BOX - hide on page",
                "description": "RIGHT BOX - hide on page",
                "type": "checkbox"
            },
            "box_bottom": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "BOTTOM BOX (desktop & mobile)"
            },
            "box_bottom_size": {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_bottom_html_tag": {
                "name": "BOTTOM BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_bottom_hide": {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "checkbox"
            }
        },
        "ListExtendedWidgets2": {
            "container_order": {
                "name": "Order",
                "description": "Order",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ]
            },
            "container_name": {
                "name": "Container name",
                "description": "Container name",
                "type": "textfield"
            },
            "container_url": {
                "name": "Container url",
                "description": "Container url",
                "type": "textfield"
            },
            "container_html_tag": {
                "name": "Container HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "container_section_html_tag": {
                "name": "Section HTML tag (top box, left box, middle box) wrapper",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "container_name_hide": {
                "name": "Container - hide name on page",
                "description": "Container - hide name on page",
                "type": "checkbox"
            },
            "container_classes": {
                "name": "Container CSS custom classes",
                "description": "Container CSS custom classes",
                "type": "textfield"
            },
            "container_hide": {
                "name": "Container - hide on page",
                "description": "Container - hide on page",
                "type": "checkbox"
            },
            "box_top_full": {
                "name": "TOP BOX - full page width",
                "description": "TOP BOX - full page width",
                "type": "checkbox"
            },
            "box_bottom_full": {
                "name": "BOTTOM BOX - full page width",
                "description": "BOTTOM BOX - full page width",
                "type": "checkbox"
            },
            "container_full": {
                "name": "Container - full page width",
                "description": "Container - full page width",
                "type": "checkbox"
            },
            "box_top": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "TOP BOX (desktop & mobile)"
            },
            "box_top_size": {
                "name": "TOP BOX - custom width",
                "description": "TOP BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_top_html_tag": {
                "name": "TOP BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_top_hide": {
                "name": "TOP BOX - hide on page",
                "description": "TOP BOX - hide on page",
                "type": "checkbox"
            },
            "box_left": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "LEFT BOX (desktop & mobile)"
            },
            "box_left_size": {
                "name": "LEFT BOX - custom width",
                "description": "LEFT BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_left_html_tag": {
                "name": "LEFT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_left_hide": {
                "name": "LEFT BOX - hide on page",
                "description": "LEFT BOX - hide on page",
                "type": "checkbox"
            },
            "box_middle": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "MIDDLE BOX (desktop & mobile)"
            },
            "box_middle_size": {
                "name": "MIDDLE BOX - custom width",
                "description": "MIDDLE BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_middle_html_tag": {
                "name": "MIDDLE BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_middle_hide": {
                "name": "MIDDLE BOX - hide on page",
                "description": "MIDDLE BOX - hide on page",
                "type": "checkbox"
            },
            "box_right": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "RIGHT BOX (desktop & mobile)"
            },
            "box_right_size": {
                "name": "RIGHT BOX - custom width",
                "description": "RIGHT BOX - custom width",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_right_html_tag": {
                "name": "RIGHT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_right_hide": {
                "name": "RIGHT BOX - hide on page",
                "description": "RIGHT BOX - hide on page",
                "type": "checkbox"
            },
            "box_bottom": {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "BOTTOM BOX (desktop & mobile)"
            },
            "box_bottom_size": {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "select",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            },
            "box_bottom_html_tag": {
                "name": "BOTTOM BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside",
                    "article"
                ],
                "required": true
            },
            "box_bottom_hide": {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "checkbox"
            }
        }
    }
}
