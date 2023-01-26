"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const graphql_tag_1 = require("graphql-tag");
const GeneralParts = __importStar(require("./generalParts"));
const _ = __importStar(require("lodash"));
const BasicWidget_module_scss_1 = __importDefault(require("../../../../../styles/widgets/common/BasicWidget.module.scss"));
const WebsiteApiProvider_1 = require("../../../../providers/WebsiteApiProvider");
async function BasicWidget({ widgetConfig, context, extendableAttributes = {} }) {
    async function getData() {
        const query = (0, graphql_tag_1.gql) `
            query($codeName:  ID!, $nodeId:  ID!){
                section(codeName: $codeName, nodeId: $nodeId) { 
                    items{
                        edges {
                            node {
                                title
                                lead
                                image {
                                    url,
                                    caption
                                }
                                url
                                originalContent {
                                    ... on Story {
                                        image {
                                            url,
                                            caption
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const variables = {
            codeName: widgetConfig.section_name,
            nodeId: context.controllerParams.gqlResponse.data.site.data.node.id
        };
        return await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    }
    const response = await getData();
    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    context.customData.itemParts = extendableAttributes.itemParts;
    const generalComponents = widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return (0, jsx_runtime_1.jsxs)("div", { style: { display: 'none' }, children: [showOption, " not supported, yet"] });
        }
        return (0, jsx_runtime_1.jsx)(Component, { context: context, widgetConfig: widgetConfig, response: response }, index);
    });
    let cssModules = BasicWidget_module_scss_1.default.BasicWidget;
    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(BasicWidget_module_scss_1.default.BasicWidget) || BasicWidget_module_scss_1.default.BasicWidget;
    }
    function render() {
        return (0, jsx_runtime_1.jsx)("div", { className: ['BasicWidget', cssModules].join(' '), children: generalComponents });
    }
    if (extendableAttributes.render) {
        return extendableAttributes.render(generalComponents, cssModules);
    }
    return render();
}
exports.BasicWidget = BasicWidget;
//# sourceMappingURL=BasicWidget.js.map