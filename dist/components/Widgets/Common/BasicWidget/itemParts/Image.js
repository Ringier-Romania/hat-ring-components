"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Image({ context, widgetConfig, data }) {
    return (data.image ?
        (0, jsx_runtime_1.jsx)("div", { className: ['Image'].join(' '), children: (0, jsx_runtime_1.jsx)("img", { src: data.image.url }) }) :
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = Image;
//# sourceMappingURL=Image.js.map