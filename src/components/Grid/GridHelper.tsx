import {UtilsHelper_convertToInt} from "../../helpers/UtilsHelper";

export function GridHelper_generateGridConfig(configKey, title, containerCount = 2): any {

    let indexes = Array.from({length: containerCount}, (value, index) => index);
    let sizes = Array.from({length: 12}, (value, index) => index + 1);
    let keys = Array.from({length: containerCount}, (value, index) => configKey +  (UtilsHelper_convertToInt(index) + 1));
    const fields = [
        {
            name: 'container_html_tag',
            paramsDescription: {
                "name": "Container HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: "div"
        },
        {
            name: 'container_classes',
            paramsDescription: {
                "name": "Container CSS custom classes",
                "description": "Container CSS custom classes",
                "type": "textfield"
            },
            defaultParams: ""
        },
        {
            name: 'container_hide',
            paramsDescription: {
                "name": "Container - hide on page",
                "description": "Container - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
        {
            name: 'box_top',
            paramsDescription: {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "TOP BOX (desktop & mobile)"
            },
            defaultParams: []
        },
        {
            name: 'box_top_size',
            paramsDescription: {
                "name": "TOP BOX - custom width",
                "description": "TOP BOX - custom width",
                "type": "select",
                "items": sizes
            },
            defaultParams: "12"
        },
        {
            name: 'box_top_html_tag',
            paramsDescription: {
                "name": "TOP BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: 'aside'
        },
        {
            name: 'box_top_hide',
            paramsDescription: {
                "name": "TOP BOX - hide on page",
                "description": "TOP BOX - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
        {
            name: 'box_left',
            paramsDescription: {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "LEFT BOX (desktop & mobile)"
            },
            defaultParams: []
        },
        {
            name: 'box_left_size',
            paramsDescription: {
                "name": "LEFT BOX - custom width",
                "description": "LEFT BOX - custom width",
                "type": "select",
                "items": sizes
            },
            defaultParams: '3'
        },
        {
            name: 'box_left_html_tag',
            paramsDescription: {
                "name": "LEFT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: 'div'
        },
        {
            name: 'box_left_hide',
            paramsDescription: {
                "name": "LEFT BOX - hide on page",
                "description": "LEFT BOX - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
        {
            name: 'box_middle',
            paramsDescription: {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "MIDDLE BOX (desktop & mobile)"
            },
            defaultParams: []
        },
        {
            name: 'box_middle_size',
            paramsDescription: {
                "name": "MIDDLE BOX - custom width",
                "description": "MIDDLE BOX - custom width",
                "type": "select",
                "items": sizes
            },
            defaultParams: "6"
        },
        {
            name: 'box_middle_html_tag',
            paramsDescription: {
                "name": "MIDDLE BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: 'div'
        },
        {
            name: 'box_middle_hide',
            paramsDescription: {
                "name": "MIDDLE BOX - hide on page",
                "description": "MIDDLE BOX - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
        {
            name: 'box_right',
            paramsDescription: {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "RIGHT BOX (desktop & mobile)"
            },
            defaultParams: []
        },
        {
            name: 'box_right_size',
            paramsDescription: {
                "name": "RIGHT BOX - custom width",
                "description": "RIGHT BOX - custom width",
                "type": "select",
                "items": sizes
            },
            defaultParams: '3'
        },
        {
            name: 'box_right_html_tag',
            paramsDescription: {
                "name": "RIGHT BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: 'div'
        },
        {
            name: 'box_right_hide',
            paramsDescription: {
                "name": "RIGHT BOX - hide on page",
                "description": "RIGHT BOX - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
        {
            name: 'box_bottom',
            paramsDescription: {
                "type": "modules",
                "ordered": true,
                "editable": true,
                "modules_list": "GULP-MODULES-LIST",
                "name": "BOTTOM BOX (desktop & mobile)"
            },
            defaultParams: []
        },
        {
            name: 'box_bottom_size',
            paramsDescription: {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "select",
                "items": sizes
            },
            defaultParams: '12'
        },
        {
            name: 'box_bottom_html_tag',
            paramsDescription: {
                "name": "BOTTOM BOX - HTML tag",
                "description": "",
                "type": "select",
                "allowBlank": false,
                "multiSelect": false,
                "items": [
                    "div",
                    "section",
                    "aside"
                ],
                "required": true
            },
            defaultParams: 'aside'
        },
        {
            name: 'box_bottom_hide',
            paramsDescription: {
                "name": "BOTTOM BOX - hide on page",
                "description": "BOTTOM BOX - hide on page",
                "type": "checkbox"
            },
            defaultParams: false
        },
    ];


    let groups = {};
    indexes.forEach((key, index) => {
        groups['group' + (UtilsHelper_convertToInt(key) + 1)] = {
            "type": "group",
            "name": "Container " + (UtilsHelper_convertToInt(index) + 1),
            "fields": fields.map((field) => {
                return configKey + (UtilsHelper_convertToInt(index) + 1) + '.' + field.name
            })
        }
    });


    let defaultParams = {};
    const defaultParamsObj = {};
    fields.forEach(field => {
        defaultParamsObj[field.name] = field.defaultParams;
    })
    indexes.forEach((key, index) => {
        defaultParams[configKey + (UtilsHelper_convertToInt(key) + 1)] = defaultParamsObj
    });


    let paramsDescription = {};
    const paramsDescriptionObj = {};
    fields.forEach(field => {
        paramsDescriptionObj[field.name] = field.paramsDescription;
    })
    indexes.forEach((key, index) => {
        paramsDescription[configKey + (UtilsHelper_convertToInt(key) + 1)] = paramsDescriptionObj
    });

    let configObj = {
        "sections": [{
            title,
            keys,
            groups,
        }],
        defaultParams,
        paramsDescription
    };

    return configObj;

}
