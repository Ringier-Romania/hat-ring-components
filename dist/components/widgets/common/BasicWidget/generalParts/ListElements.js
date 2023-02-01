"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingLink_1 = __importDefault(require("../../../../common/RingLink"));
const itemParts_1 = require("../itemParts");
const lodash_1 = __importDefault(require("lodash"));
function ListElements({ context, widgetConfig, response }) {
    const colClass = Math.floor(12 / parseInt(widgetConfig.columns));
    const buildElementContent = (element) => {
        const imageProps = {
            image: {
                url: element['Image src'],
                caption: element.title
            },
            url: '',
            type: 'ListElements',
            imageDim: lodash_1.default.get(element, 'Image dimensions (eg. 600x300)', ''),
            originalContent: {}
        };
        const customCssClass = lodash_1.default.get(element, 'Custom CSS Class', '');
        return (0, jsx_runtime_1.jsxs)("div", { className: ['LayoutItem', customCssClass].join(' '), children: [element['Image src'] && (0, jsx_runtime_1.jsx)(itemParts_1.Image, { context: context, widgetConfig: widgetConfig, data: imageProps }), element.Title && (0, jsx_runtime_1.jsx)("p", { className: "Title", children: element.Title }), element.Description && (0, jsx_runtime_1.jsx)("div", { className: "Description", children: element.Description }), element.Text && (0, jsx_runtime_1.jsx)("div", { className: "Text", children: element.Text })] });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: ['ListElements'].join(' '), children: widgetConfig.listElements.map(element => {
            return (0, jsx_runtime_1.jsx)("div", { className: ['LayoutWrapper', 'col' + colClass].join(' '), children: element['Link url'] ?
                    (0, jsx_runtime_1.jsx)(RingLink_1.default, { href: element['Link url'], children: buildElementContent(element) }) :
                    buildElementContent(element) });
        }) }));
}
exports.default = ListElements;
//# sourceMappingURL=ListElements.js.map