"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
function ImageBlock({ blockData }) {
    var _a;
    const { title, alt, image, url, link } = blockData;
    return (0, jsx_runtime_1.jsxs)("div", { className: "imageBlock", children: [link ?
                (0, jsx_runtime_1.jsx)("a", { href: link.url, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: url, alt: alt, width: image.width, height: image.height }) }) :
                (0, jsx_runtime_1.jsx)(image_1.default, { src: url, alt: alt, width: image.width, height: image.height }), (0, jsx_runtime_1.jsxs)("div", { className: "imgMetaData", children: [title && (0, jsx_runtime_1.jsx)("span", { className: "caption", children: title }), image.description && (0, jsx_runtime_1.jsx)("span", { className: "description", children: image.description }), ((_a = image.sources) === null || _a === void 0 ? void 0 : _a.length) && (0, jsx_runtime_1.jsx)("span", { className: "copyright", children: `Foto: ${image.sources[0].source.name}` })] })] });
}
exports.default = ImageBlock;
//# sourceMappingURL=ImageBlock.js.map