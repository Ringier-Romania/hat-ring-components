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
exports.GenericList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const graphql_tag_1 = require("graphql-tag");
const WebsiteApiProvider_1 = require("../../../../providers/WebsiteApiProvider");
const ItemParts = __importStar(require("./itemParts"));
const Header_1 = __importDefault(require("./generalParts/Header"));
const Items_1 = __importDefault(require("./generalParts/Items"));
const WidgetHelper_1 = require("../../../../helpers/WidgetHelper");
const GenericList_module_scss_1 = __importDefault(require("../../../../../styles/widgets/common/GenericList.module.scss"));
const Pagination_1 = __importDefault(require("./generalParts/Pagination"));
async function GenericList({ widgetConfig, context, extendableAttributes = {} }) {
    const currentPage = parseInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));
    async function getData(queryNodeFragment) {
        let dynamicVariablesTypes = {};
        let dynamicVariables = {};
        let dynamicFragmentsNames = '';
        const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
            var _a;
            const allItemParts = extendableAttributes.itemParts || ItemParts;
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
                    dynamicFragmentsNames += ` ...${fragment.query.definitions[0].name.value} \n`;
                    return `${(_a = fragment.query.loc) === null || _a === void 0 ? void 0 : _a.source.body}`;
                }
            }
        }).join('\n');
        const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
            return `, ${key}: ${dynamicVariablesTypes[key]}`;
        }).join(' ');
        const query = (0, graphql_tag_1.gql) `
            query($categoryId: UUID!, $limit: Int!, $offset: Int! ${mappedDynamicVariablesTypes}){
                stories(filter:{category: {in: [$categoryId]}},limit: $limit, offset: $offset ){
                    total
                    edges {
                        node {
                            mainPublicationPoint {
                                url
                            }
                            ${dynamicFragmentsNames}
                            ${queryNodeFragment}
                        }
                    }
                }
            }
            ${dynamicFragments}
        `;
        const categoryId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id');
        const offset = (widgetConfig.postShift || 0) + ((currentPage - 1) * widgetConfig.paginationElements);
        const variables = {
            ...dynamicVariables,
            categoryId: categoryId,
            limit: widgetConfig.paginationElements,
            offset: offset
        };
        return await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    }
    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment);
    let cssModules = GenericList_module_scss_1.default.GenericList;
    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(GenericList_module_scss_1.default.GenericList) || GenericList_module_scss_1.default.GenericList;
    }
    function render() {
        return (0, jsx_runtime_1.jsxs)("div", { className: WidgetHelper_1.WidgetHelper.getWidgetCssClasses(widgetConfig, ['GenericList', cssModules]), children: [(0, jsx_runtime_1.jsx)(Header_1.default, { context: context, widgetConfig: widgetConfig, response: response }), (0, jsx_runtime_1.jsx)(Items_1.default, { context: context, widgetConfig: widgetConfig, response: response, extendableAttributes: extendableAttributes }), (0, jsx_runtime_1.jsx)(Pagination_1.default, { context: context, widgetConfig: widgetConfig, response: response, currentPage: currentPage })] });
    }
    if (extendableAttributes.render) {
        return extendableAttributes.render(cssModules);
    }
    return render();
}
exports.GenericList = GenericList;
//# sourceMappingURL=GenericList.js.map