"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Widget_1 = require("./Widget");
;
function Box({ boxName, widgets, context, size, tagName }) {
    const BoxTag = `${tagName || 'div'}`;
    return (0, jsx_runtime_1.jsx)(BoxTag, { className: ['gridBox', boxName, 'gridCol' + size].join(' '), children: widgets.map(widgetConfig => {
            return (0, jsx_runtime_1.jsx)(Widget_1.Widget, { widgetConfig: widgetConfig, context: context });
        }) });
}
exports.Box = Box;
//# sourceMappingURL=Box.js.map