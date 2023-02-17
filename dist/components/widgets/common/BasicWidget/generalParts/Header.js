"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingLink_1 = __importDefault(require("../../../../common/RingLink"));
const WidgetHelper_1 = __importDefault(require("../../../../../helpers/WidgetHelper"));
function Header({ context, widgetConfig, response }) {
    const headerText = widgetConfig.labelValue;
    if (!headerText) {
        return WidgetHelper_1.default.renderEmptyComponent('Header');
    }
    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span');
    const headerUrl = widgetConfig.labelLink;
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Header'].join(' '), children: headerUrl && headerText
            ? (0, jsx_runtime_1.jsx)(RingLink_1.default, { href: headerUrl, children: (0, jsx_runtime_1.jsx)(HeaderTag, { children: headerText }) })
            : (0, jsx_runtime_1.jsx)(HeaderTag, { children: headerText }) }));
}
exports.default = Header;
//# sourceMappingURL=Header.js.map