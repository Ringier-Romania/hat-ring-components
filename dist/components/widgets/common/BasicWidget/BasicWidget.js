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
const types_1 = require("./types");
const graphql_tag_1 = require("graphql-tag");
const GeneralParts = __importStar(require("./generalParts"));
const _ = __importStar(require("lodash"));
const BasicWidget_module_scss_1 = __importDefault(require("../../../../../styles/widgets/common/BasicWidget.module.scss"));
const WebsiteApiProvider_1 = require("../../../../providers/WebsiteApiProvider");
const helpers_1 = require("../../../../helpers");
const ItemParts = __importStar(require("./itemParts"));
async function BasicWidget({ widgetConfig, context, extendableAttributes = {} }) {
    var _a, _b, _c;
    if ((0, helpers_1.shouldHideWidget)(widgetConfig, context)) {
        return (0, helpers_1.renderEmptyWidget)(widgetConfig);
    }
    async function getData(queryNodeFragment) {
        let dynamicVariablesTypes = {};
        let dynamicVariables = {};
        let dynamicFragmentsTitles = '';
        const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
            var _a;
            const allItemParts = context.customData.itemParts || ItemParts;
            const ItemPart = allItemParts[_.upperFirst(showOption)];
            if (ItemPart && ItemPart.getFragment) {
                const fragment = ItemPart.getFragment(widgetConfig);
                if (fragment.variables) {
                    dynamicVariables = { ...dynamicVariables, ...fragment.variables };
                }
                if (fragment.variablesTypes) {
                    dynamicVariablesTypes = { ...dynamicVariablesTypes, ...fragment.variablesTypes };
                }
                if (fragment.query) {
                    dynamicFragmentsTitles += ` ...${fragment.query.definitions[0].name.value} \n`;
                    return `${(_a = fragment.query.loc) === null || _a === void 0 ? void 0 : _a.source.body}`;
                }
            }
        }).join('\n');
        const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
            return `, ${key}: ${dynamicVariablesTypes[key]}`;
        }).join(' ');
        const query = (0, graphql_tag_1.gql) `
            query($codeName:  ID!, $nodeId:  ID!, $first: Int ${mappedDynamicVariablesTypes}){
                section(codeName: $codeName, nodeId: $nodeId) {
                    items(first: $first) {
                        edges {
                            node {
                                url
                                ${dynamicFragmentsTitles}
                                ${queryNodeFragment}
                            }
                        }
                    }
                }
            }
            ${dynamicFragments}
        `;
        const variables = {
            ...dynamicVariables,
            codeName: widgetConfig.section_name,
            nodeId: context.hatControllerParams.gqlResponse.data.site.data.node.id,
            first: (Number(widgetConfig.offset) + Number(widgetConfig.count)) || null
        };
        return await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    }
    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    context.customData.itemParts = extendableAttributes.itemParts;
    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment);
    if ((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.section) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c.edges) {
        response.data.section.items.edges = response.data.section.items.edges.slice(Number(widgetConfig.offset));
    }
    const hideWhenNoItems = widgetConfig.additionalOptions && widgetConfig.additionalOptions.includes(types_1.BasicWidgetAdditionalOptions.HideWhenNoSectionItems);
    if (hideWhenNoItems && _.get(response, 'data.section.items.edges.length', 0) === 0) {
        return (0, helpers_1.renderEmptyWidget)(widgetConfig);
    }
    const generalComponents = widgetConfig.generalShowOptions && widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return (0, helpers_1.renderEmptyComponent)(showOption, 'not supported, yet');
        }
        return (0, jsx_runtime_1.jsx)(Component, { context: context, widgetConfig: widgetConfig, response: response }, index);
    });
    let cssModules = BasicWidget_module_scss_1.default.BasicWidget;
    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(BasicWidget_module_scss_1.default.BasicWidget) || BasicWidget_module_scss_1.default.BasicWidget;
    }
    function render() {
        return (0, jsx_runtime_1.jsx)("div", { className: (0, helpers_1.getWidgetCssClasses)(widgetConfig, [cssModules]), children: generalComponents });
    }
    if (extendableAttributes.render) {
        return extendableAttributes.render(generalComponents, cssModules);
    }
    return render();
}
exports.BasicWidget = BasicWidget;
//# sourceMappingURL=BasicWidget.js.map