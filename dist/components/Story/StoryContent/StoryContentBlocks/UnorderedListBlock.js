"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function UnorderedListBlock({ blockData }) {
    return (0, jsx_runtime_1.jsx)("div", { className: "UnorderedListBlock", children: (0, jsx_runtime_1.jsx)("ul", { children: blockData.entries.map(entry => (0, jsx_runtime_1.jsx)("li", { children: entry })) }) });
}
exports.default = UnorderedListBlock;
//# sourceMappingURL=UnorderedListBlock.js.map