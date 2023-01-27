"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = __importStar(require("components/common/RingImage"));
const RingLink_1 = __importDefault(require("components/common/RingLink"));
function ImageBlock({ blockData, config }) {
    var _a;
    const { title, alt, image, url, link } = blockData;
    return (0, jsx_runtime_1.jsxs)("div", { className: "ImageBlock", children: [link ?
                (0, jsx_runtime_1.jsx)(RingLink_1.default, { href: link.url, children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { priority: true, src: url, alt: alt || '', width: config.width, height: config.height, transform: RingImage_1.TransformType.ResizeCropAuto }) }) :
                (0, jsx_runtime_1.jsx)(RingImage_1.default, { priority: true, src: url, alt: alt || '', width: config.width, height: config.height, transform: RingImage_1.TransformType.ResizeCropAuto }), (0, jsx_runtime_1.jsxs)("div", { className: "imgMetaData", children: [title && (0, jsx_runtime_1.jsx)("span", { className: "caption", children: title }), image.description && (0, jsx_runtime_1.jsx)("span", { className: "description", children: image.description }), ((_a = image.sources) === null || _a === void 0 ? void 0 : _a.length) && (0, jsx_runtime_1.jsx)("span", { className: "copyright", children: `Foto: ${image.sources[0].source.name}` })] })] });
}
exports.default = ImageBlock;
//# sourceMappingURL=ImageBlock.js.map