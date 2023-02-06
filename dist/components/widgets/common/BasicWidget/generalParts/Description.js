"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Description({ context, widgetConfig, response }) {
    const descText = widgetConfig.description;
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Description'].join(' '), children: (0, jsx_runtime_1.jsx)("p", { children: descText }) }));
}
exports.default = Description;
//# sourceMappingURL=Description.js.map