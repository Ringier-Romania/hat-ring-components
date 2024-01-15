export let DeveloperSettingsWebsitesConfig
    = {
    "sections": [
        {
            "title": "Developer settings",
            "groups": {
                "devGeneral": {
                    "type": "group",
                    "name": "General",
                    "fields": [
                        "devGeneral.textReplacers",
                        "devGeneral.globalCustomTeasers"
                    ]
                },
                "dateFormat": {
                    "type": "group",
                    "name": "Date format (Moment.js) - globally",
                    "fields": [
                        "dateFormat.timeZone",
                        "dateFormat.useExtendedDatesFormat",
                        "dateFormat.sameDay",
                        "dateFormat.lastDay",
                        "dateFormat.nextDay",
                        "dateFormat.lastWeek",
                        "dateFormat.nextWeek",
                        "dateFormat.sameElse"
                    ]
                }
            },
            "keys": [
                "devGeneral",
                "dateFormat",
            ]
        }
    ],
    "defaultParams": {
        "devGeneral": {
            "textReplacers": [],
            "globalCustomTeasers": []
        },
       "dateFormat": {
            "timeZone": "Europe/London",
            "useExtendedDatesFormat": false,
            "sameDay": "[Today at] h:mm A",
            "lastDay": "[Yesterday at] h:mm A",
            "nextDay": "[Tomorrow at] h:mm A",
            "lastWeek": "[Last] dddd [at] h:mm A",
            "nextWeek": "dddd [at] h:mm A",
            "sameElse": "DD-MM-YYYY",
        }
    },
    "paramsDescription": {
        "devGeneral": {
            "textReplacers": {
                "type": "treeobject",
                "name": "Text decorators",
                "description": "Text decorators",
                "properties": [
                    {
                        "name": "Match pattern",
                        "type": "textfield"
                    },
                    {
                        "name": "Replacement",
                        "type": "textfield"
                    }
                ]
            },
            "globalCustomTeasers": {
                "type": "treeobject",
                "name": "Global custom teasers",
                "description": "",
                "properties": [
                    {
                        "name": "Teaser code name",
                        "type": "textfield"
                    },
                    {
                        "name": "For big image",
                        "type": "checkbox",
                    },
                    {
                        "name": "For mobile",
                        "type": "checkbox",
                    },
                    {
                        "name": "Widget type",
                        "type": "select",
                        "items": [
                            "BasicWidget",
                            "GenericList"
                        ]
                    }
                ]
            },
        },
        "dateFormat": {
            "timeZone": {
                "name": "Service time zone (Moment Timezone)",
                "description": "",
                "type": "textfield",
                "required": true
            },
            "useExtendedDatesFormat": {
                "name": "Use extended (below) date format (as default for widgets & lists)",
                "description": "",
                "type": "checkbox"
            },
            "sameDay" : {
                "name": "Same day",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            },
            "lastDay": {
                "name": "Last day",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            },
            "nextDay": {
                "name": "Next day",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            },
            "lastWeek": {
                "name": "Last week",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            },
            "nextWeek": {
                "name": "Next week",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            },
            "sameElse": {
                "name": "Same else",
                "description": "Moment.js calendar function body string",
                "type": "textfield"
            }
        }
    },
    "modules": {}
}



