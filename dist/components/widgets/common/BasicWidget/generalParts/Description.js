"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const _helpers_1 = require("@helpers");
function Description({ context, widgetConfig, response }) {
    const descText = widgetConfig.description;
    if (!descText) {
        return (0, _helpers_1.renderEmptyComponent)('Description');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Description'].join(' '), children: (0, jsx_runtime_1.jsx)("p", { children: descText }) }));
}
exports.default = Description;
//# sourceMappingURL=Description.js.map