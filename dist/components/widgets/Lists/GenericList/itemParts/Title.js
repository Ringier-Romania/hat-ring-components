"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Title({ context, widgetConfig, data }) {
    if (!data.title) {
        return WidgetHelper_1.WidgetHelper.renderEmptyComponent('Title');
    }
    const HeaderTag = 'span';
    let ItemHeaderTag = HeaderTag;
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Title'].join(' '), children: (0, jsx_runtime_1.jsx)(ItemHeaderTag, { children: data.title }) }));
}
exports.default = Title;
Title.getFragment = () => {
    return {
        variables: {},
        query: (0, graphql_tag_1.default) `fragment TitleFragment on Story {
            title
        }`
    };
};
//# sourceMappingURL=Title.js.map