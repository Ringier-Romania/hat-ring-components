"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Lead({ context, widgetConfig, data }) {
    if (!data.lead) {
        return WidgetHelper_1.WidgetHelper.renderEmptyComponent('Lead');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Lead'].join(' '), children: (0, jsx_runtime_1.jsx)("span", { children: data.lead }) }));
}
exports.default = Lead;
Lead.getFragment = () => {
    return {
        variables: {},
        query: (0, graphql_tag_1.default) `fragment LeadFragment on SectionItem {
            lead
        }`
    };
};
//# sourceMappingURL=Lead.js.map