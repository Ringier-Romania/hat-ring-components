"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function ParagraphBlock({ blockData }) {
    return (0, jsx_runtime_1.jsx)("div", { className: "paragraphBlock", children: (0, jsx_runtime_1.jsx)("p", { dangerouslySetInnerHTML: { __html: blockData.text } }) });
}
exports.default = ParagraphBlock;
//# sourceMappingURL=ParagraphBlock.js.map