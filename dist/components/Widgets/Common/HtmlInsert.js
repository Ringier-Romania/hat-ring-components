"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlInsert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function HtmlInsert({ widgetConfig, context }) {
    return (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: widgetConfig.plainHtml } });
}
exports.HtmlInsert = HtmlInsert;
//# sourceMappingURL=HtmlInsert.js.map