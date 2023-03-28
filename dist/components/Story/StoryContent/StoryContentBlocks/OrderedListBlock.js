"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function OrderedListBlock({ blockData }) {
    return (0, jsx_runtime_1.jsx)("div", { className: "OrderedListBlock", children: (0, jsx_runtime_1.jsx)("ol", { children: blockData.entries.map(entry => (0, jsx_runtime_1.jsx)("li", { dangerouslySetInnerHTML: { __html: entry } })) }) });
}
exports.default = OrderedListBlock;
//# sourceMappingURL=OrderedListBlock.js.map