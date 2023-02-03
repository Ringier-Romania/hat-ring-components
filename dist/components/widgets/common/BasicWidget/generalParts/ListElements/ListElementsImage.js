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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = __importStar(require("../../../../../common/RingImage"));
function ListElementsImage({ context, widgetConfig, data }) {
    if (!data.url) {
        return null;
    }
    let sizes = '0x0';
    sizes = data.imageDim || widgetConfig.listElementsImageSize || '0x0';
    const imageWidth = Number(sizes.split('x')[0]);
    const imageHeight = Number(sizes.split('x')[1]);
    const ringImageProps = {
        src: data.url,
        width: imageWidth,
        height: imageHeight,
        transform: RingImage_1.TransformType.ResizeCropAuto,
        alt: data.caption,
    };
    if (!imageWidth || !imageHeight) {
        delete ringImageProps.width;
        delete ringImageProps.height;
        delete ringImageProps.transform;
        ringImageProps.fill = true;
    }
    return ((data.url) ?
        (0, jsx_runtime_1.jsx)("div", { className: ['ListElementsImage', (!imageWidth || !imageHeight) ? 'listElementsImageWrapper' : ''].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { ...ringImageProps, className: (!imageWidth || !imageHeight) ? 'listElementsImageFill' : '' }) }) :
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = ListElementsImage;
//# sourceMappingURL=ListElementsImage.js.map