"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlInsert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = __importDefault(require("../../../helpers/WidgetHelper"));
;
function HtmlInsert({ widgetConfig, context }) {
    return (0, jsx_runtime_1.jsx)("div", { className: WidgetHelper_1.default.getWidgetCssClasses(widgetConfig), dangerouslySetInnerHTML: { __html: widgetConfig.plainHtml } });
}
exports.HtmlInsert = HtmlInsert;
//# sourceMappingURL=HtmlInsert.js.map