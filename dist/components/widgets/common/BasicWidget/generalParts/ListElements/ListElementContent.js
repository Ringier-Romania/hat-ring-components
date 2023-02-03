"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ListElementsImage_1 = __importDefault(require("./ListElementsImage"));
const lodash_1 = __importDefault(require("lodash"));
function ListElementContent({ context, widgetConfig, data }) {
    const imageProps = {
        url: data['Image src'],
        caption: data.Title,
        imageDim: lodash_1.default.get(data, 'Image dimensions (eg. 600x300)', ''),
    };
    const customCssClass = lodash_1.default.get(data, 'Custom CSS Class', '');
    return (0, jsx_runtime_1.jsxs)("div", { className: ['ListElementContent', customCssClass].join(' '), children: [data['Image src'] && (0, jsx_runtime_1.jsx)(ListElementsImage_1.default, { context: context, widgetConfig: widgetConfig, data: imageProps }), data.Title && (0, jsx_runtime_1.jsx)("p", { className: "Title", children: data.Title }), data.Description && (0, jsx_runtime_1.jsx)("div", { className: "Description", children: data.Description }), data.Text && (0, jsx_runtime_1.jsx)("div", { className: "Text", children: data.Text })] });
}
exports.default = ListElementContent;
;
//# sourceMappingURL=ListElementContent.js.map