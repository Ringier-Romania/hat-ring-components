"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function PreformattedBlock({ blockData }) {
    return (0, jsx_runtime_1.jsx)("div", { className: "PreformattedBlock", children: (0, jsx_runtime_1.jsx)("pre", { children: blockData.text }) });
}
exports.default = PreformattedBlock;
//# sourceMappingURL=PreformattedBlock.js.map