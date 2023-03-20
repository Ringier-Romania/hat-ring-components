"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = require("../../../common/RingImage");
const RingLink_1 = require("../../../common/RingLink");
function ImageBlock({ blockData, widgetConfig }) {
    var _a;
    const { title, alt, image, url, link } = blockData;
    return (0, jsx_runtime_1.jsxs)("div", { className: "ImageBlock", children: [link ?
                (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { href: link.url, children: (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { priority: true, src: url, alt: alt || '', width: widgetConfig.width, height: widgetConfig.height, transform: RingImage_1.TransformType.ResizeCropAuto }) }) :
                (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { priority: true, src: url, alt: alt || '', width: widgetConfig.width, height: widgetConfig.height, transform: RingImage_1.TransformType.ResizeCropAuto }), (0, jsx_runtime_1.jsxs)("div", { className: "imgMetaData", children: [title && (0, jsx_runtime_1.jsx)("span", { className: "caption", children: title }), image.description && (0, jsx_runtime_1.jsx)("span", { className: "description", children: image.description }), ((_a = image.sources) === null || _a === void 0 ? void 0 : _a.length) && (0, jsx_runtime_1.jsx)("span", { className: "copyright", children: `Foto: ${image.sources[0].source.name}` })] })] });
}
exports.default = ImageBlock;
//# sourceMappingURL=ImageBlock.js.map