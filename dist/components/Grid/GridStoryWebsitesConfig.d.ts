export declare let GridStoryWebsitesConfig: {
    sections: {
        title: string;
        keys: string[];
        groups: {
            group0: {
                type: string;
                name: string;
                fields: string[];
            };
            group1: {
                type: string;
                name: string;
                fields: string[];
            };
            group4: {
                type: string;
                name: string;
                fields: string[];
            };
            group5: {
                type: string;
                name: string;
                fields: string[];
            };
            group6: {
                type: string;
                name: string;
                fields: string[];
            };
        };
    }[];
    defaultParams: {
        DetailPageGeneral: {
            customCSSClass: string;
            main_html_tag: string;
            section_html_tag: string;
            article_html_tag: string;
            additionalOptions: never[];
        };
        DetailExtendedWidgets1: {
            container_order: string;
            container_name: boolean;
            container_url: boolean;
            container_html_tag: string;
            container_section_html_tag: string;
            container_name_hide: boolean;
            container_classes: string;
            container_hide: boolean;
            box_top_full: boolean;
            box_bottom_full: boolean;
            container_full: boolean;
            box_top: never[];
            box_top_size: string;
            box_top_html_tag: string;
            box_left: never[];
            box_left_size: string;
            box_left_html_tag: string;
            box_middle: never[];
            box_middle_size: string;
            box_middle_html_tag: string;
            box_right: never[];
            box_right_size: string;
            box_right_html_tag: string;
            box_bottom: never[];
            box_bottom_size: string;
            box_bottom_html_tag: string;
        };
        DetailExtendedWidgets2: {
            container_order: string;
            container_name: boolean;
            container_url: boolean;
            container_html_tag: string;
            container_section_html_tag: string;
            container_name_hide: boolean;
            container_classes: string;
            container_hide: boolean;
            box_top_full: boolean;
            box_bottom_full: boolean;
            container_full: boolean;
            box_top: never[];
            box_top_size: string;
            box_top_html_tag: string;
            box_left: never[];
            box_left_size: string;
            box_left_html_tag: string;
            box_middle: never[];
            box_middle_size: string;
            box_middle_html_tag: string;
            box_right: never[];
            box_right_size: string;
            box_right_html_tag: string;
            box_bottom: never[];
            box_bottom_size: string;
            box_bottom_html_tag: string;
        };
        DetailExtendedWidgets3: {
            container_order: string;
            container_name: boolean;
            container_url: boolean;
            container_html_tag: string;
            container_section_html_tag: string;
            container_name_hide: boolean;
            container_classes: string;
            container_hide: boolean;
            box_top_full: boolean;
            box_bottom_full: boolean;
            container_full: boolean;
            box_top: never[];
            box_top_size: string;
            box_top_html_tag: string;
            box_left: never[];
            box_left_size: string;
            box_left_html_tag: string;
            box_middle: never[];
            box_middle_size: string;
            box_middle_html_tag: string;
            box_right: never[];
            box_right_size: string;
            box_right_html_tag: string;
            box_bottom: never[];
            box_bottom_size: string;
            box_bottom_html_tag: string;
        };
        DetailExtendedWidgets4: {
            container_order: string;
            container_name: boolean;
            container_url: boolean;
            container_html_tag: string;
            container_section_html_tag: string;
            container_name_hide: boolean;
            container_classes: string;
            container_hide: boolean;
            box_top_full: boolean;
            box_bottom_full: boolean;
            container_full: boolean;
            box_top: never[];
            box_top_size: string;
            box_top_html_tag: string;
            box_left: never[];
            box_left_size: string;
            box_left_html_tag: string;
            box_middle: never[];
            box_middle_size: string;
            box_middle_html_tag: string;
            box_right: never[];
            box_right_size: string;
            box_right_html_tag: string;
            box_bottom: never[];
            box_bottom_size: string;
            box_bottom_html_tag: string;
        };
    };
    paramsDescription: {
        DetailPageGeneral: {
            customCSSClass: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            };
            main_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            section_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            article_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            additionalOptions: {
                name: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: never[];
                required: boolean;
            };
        };
        DetailPageWidgets: {
            widgets_above_article: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_above_article_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            widgets_right_column_article: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_right_column_article_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            widgets_under_article: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            widgets_under_article_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            customClass: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            };
            disableRightColumn: {
                name: string;
                type: string;
                description: string;
            };
            customContentFramesSettings: {
                type: string;
                name: string;
                description: string;
                properties: {
                    name: string;
                    type: string;
                }[];
            };
        };
        DetailExtended: {
            enabled: {
                name: string;
                type: string;
            };
        };
        DetailExtendedWidgets1: {
            container_order: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            container_name: {
                name: string;
                description: string;
                type: string;
            };
            container_url: {
                name: string;
                description: string;
                type: string;
            };
            container_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_section_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_name_hide: {
                name: string;
                description: string;
                type: string;
            };
            container_classes: {
                name: string;
                description: string;
                type: string;
            };
            container_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_top_full: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom_full: {
                name: string;
                description: string;
                type: string;
            };
            container_full: {
                name: string;
                description: string;
                type: string;
            };
            box_top: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_top_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_top_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_top_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_left: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_left_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_left_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_left_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_middle: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_middle_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_middle_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_middle_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_right: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_right_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_right_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_right_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_bottom_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_bottom_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_bottom_hide: {
                name: string;
                description: string;
                type: string;
            };
        };
        DetailExtendedWidgets2: {
            container_order: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            container_name: {
                name: string;
                description: string;
                type: string;
            };
            container_url: {
                name: string;
                description: string;
                type: string;
            };
            container_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_section_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_name_hide: {
                name: string;
                description: string;
                type: string;
            };
            container_classes: {
                name: string;
                description: string;
                type: string;
            };
            container_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_top_full: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom_full: {
                name: string;
                description: string;
                type: string;
            };
            container_full: {
                name: string;
                description: string;
                type: string;
            };
            box_top: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_top_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_top_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_top_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_left: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_left_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_left_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_left_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_middle: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_middle_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_middle_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_middle_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_right: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_right_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_right_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_right_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_bottom_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_bottom_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_bottom_hide: {
                name: string;
                description: string;
                type: string;
            };
        };
        DetailExtendedWidgets3: {
            container_order: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            container_name: {
                name: string;
                description: string;
                type: string;
            };
            container_url: {
                name: string;
                description: string;
                type: string;
            };
            container_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_section_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_name_hide: {
                name: string;
                description: string;
                type: string;
            };
            container_classes: {
                name: string;
                description: string;
                type: string;
            };
            container_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_top_full: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom_full: {
                name: string;
                description: string;
                type: string;
            };
            container_full: {
                name: string;
                description: string;
                type: string;
            };
            box_top: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_top_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_top_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_top_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_left: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_left_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_left_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_left_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_middle: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_middle_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_middle_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_middle_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_right: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_right_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_right_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_right_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_bottom_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_bottom_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_bottom_hide: {
                name: string;
                description: string;
                type: string;
            };
        };
        DetailExtendedWidgets4: {
            container_order: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            container_name: {
                name: string;
                description: string;
                type: string;
            };
            container_url: {
                name: string;
                description: string;
                type: string;
            };
            container_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_section_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            container_name_hide: {
                name: string;
                description: string;
                type: string;
            };
            container_classes: {
                name: string;
                description: string;
                type: string;
            };
            container_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_top_full: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom_full: {
                name: string;
                description: string;
                type: string;
            };
            container_full: {
                name: string;
                description: string;
                type: string;
            };
            box_top: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_top_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_top_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_top_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_left: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_left_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_left_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_left_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_middle: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_middle_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_middle_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_middle_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_right: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_right_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_right_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_right_hide: {
                name: string;
                description: string;
                type: string;
            };
            box_bottom: {
                type: string;
                ordered: boolean;
                editable: boolean;
                modules_list: string;
                name: string;
            };
            box_bottom_size: {
                name: string;
                description: string;
                type: string;
                items: string[];
            };
            box_bottom_html_tag: {
                name: string;
                description: string;
                type: string;
                allowBlank: boolean;
                multiSelect: boolean;
                items: string[];
                required: boolean;
            };
            box_bottom_hide: {
                name: string;
                description: string;
                type: string;
            };
        };
    };
};
