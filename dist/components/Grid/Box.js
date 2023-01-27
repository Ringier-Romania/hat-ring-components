"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Widget_1 = require("./Widget");
const Grid_module_scss_1 = __importDefault(require("../../../styles/Grid/Grid.module.scss"));
;
function Box({ boxName, widgets, context, size, tagName }) {
    const BoxTag = `${tagName || 'div'}`;
    return (0, jsx_runtime_1.jsx)(BoxTag, { className: ['gridBox', boxName, 'gridCol' + size, Grid_module_scss_1.default.box].join(' '), children: widgets.map(widgetConfig => {
            return (0, jsx_runtime_1.jsx)(Widget_1.Widget, { widgetConfig: widgetConfig, context: context });
        }) });
}
exports.Box = Box;
//# sourceMappingURL=Box.js.map