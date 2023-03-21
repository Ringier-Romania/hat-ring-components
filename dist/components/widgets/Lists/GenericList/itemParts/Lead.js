"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Lead({ context, widgetConfig, data }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Lead'].join(' '), children: JSON.stringify(data) }));
}
exports.default = Lead;
Lead.getFragment = () => {
    return {
        variables: {},
        query: (0, graphql_tag_1.default) `fragment Lead on Story {
            leads{
                text
            }
        }`
    };
};
//# sourceMappingURL=Lead.js.map