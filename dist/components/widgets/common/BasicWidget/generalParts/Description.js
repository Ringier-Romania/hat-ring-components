"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = __importDefault(require("../../../../../helpers/WidgetHelper"));
function Description({ context, widgetConfig, response }) {
    const descText = widgetConfig.description;
    if (!descText) {
        return WidgetHelper_1.default.renderEmptyComponent('Description');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Description'].join(' '), children: (0, jsx_runtime_1.jsx)("p", { children: descText }) }));
}
exports.default = Description;
//# sourceMappingURL=Description.js.map