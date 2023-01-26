"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Title({ context, widgetConfig, data }) {
    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span');
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Title'].join(' '), children: widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ?
            (0, jsx_runtime_1.jsx)(HeaderTag, { children: data.title }) :
            (0, jsx_runtime_1.jsx)("span", { children: data.title }) }));
}
exports.default = Title;
//# sourceMappingURL=Title.js.map