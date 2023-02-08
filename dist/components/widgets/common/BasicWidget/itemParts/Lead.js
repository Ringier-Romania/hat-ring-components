"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const _helpers_1 = require("@helpers");
function Lead({ context, widgetConfig, data }) {
    if (!data.lead) {
        return (0, _helpers_1.renderEmptyComponent)('Lead');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Lead'].join(' '), children: (0, jsx_runtime_1.jsx)("span", { children: data.lead }) }));
}
exports.default = Lead;
//# sourceMappingURL=Lead.js.map