"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
function Header({ context, widgetConfig, response }) {
    const headerText = widgetConfig.headerText;
    if (!headerText) {
        return WidgetHelper_1.WidgetHelper.renderEmptyComponent('Header');
    }
    const HeaderTag = (widgetConfig.headerTag && widgetConfig.headerTag !== 'none' ? widgetConfig.headerTag : 'span');
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Header'].join(' '), children: (0, jsx_runtime_1.jsx)(HeaderTag, { children: headerText }) }));
}
exports.default = Header;
//# sourceMappingURL=ListElements.js.map