import {
  AbstractWebsitesWidgetConfigDefaultParams,
  AbstractWebsitesWidgetConfigParamsDescription,
} from "../../../../types/abstracts";

export let SearchBoxWebsitesConfig = {
  sections: [],
  defaultParams: {},
  paramsDescription: {},
  modules: {
    SearchBox_wdg: {
      name: "SearchBox",
      description: "",
      defaultParams: {
        ...AbstractWebsitesWidgetConfigDefaultParams,
        widgetType: "searchBox",
      },
      paramsDescription: {
        ...AbstractWebsitesWidgetConfigParamsDescription,
        placeholder: {
          name: "Placeholder",
          description: "",
          type: "textfield",
        },
        searchURLPhrase: {
          name: "Search-URL Phrase",
          description: "",
          type: "textfield",
        },
        searchParamPhrase: {
          name: "Search-Param Phrase",
          description: "",
          type: "textfield",
        },
        buttonText: {
          name: "Button text",
          description: "",
          type: "textfield",
        },
      },
    },
  },
};
