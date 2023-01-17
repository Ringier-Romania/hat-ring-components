"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function HeadingBlock({ blockData }) {
    const HeadingTag = 'h' + blockData.level;
    return (0, jsx_runtime_1.jsx)("div", { className: "HeadingBlock", children: (0, jsx_runtime_1.jsx)(HeadingTag, { children: blockData.text }) });
}
exports.default = HeadingBlock;
//# sourceMappingURL=HeadingBlock.js.map