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
const RingImage_1 = __importStar(require("../../../../common/RingImage"));
const _helpers_1 = require("@helpers");
function Image({ itemIndex, context, widgetConfig, data }) {
    const image = data.image || data.originalContent.image;
    if (!image) {
        return (0, _helpers_1.renderEmptyComponent)('Image');
    }
    const isBig = itemIndex < widgetConfig.countBig;
    const sizes = isBig ? widgetConfig.bigImageSize.split('x') : widgetConfig.standardImageSize.split('x');
    const ringImageProps = {
        src: isBig ? image.bigImageUrl : image.url,
        alt: image.caption || data.title || '',
        transform: RingImage_1.TransformType.ResizeCropAuto,
        width: Number(sizes[0]),
        height: Number(sizes[1])
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Image', isBig ? 'bigImage' : ''].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { ...ringImageProps }) }));
}
exports.default = Image;
//# sourceMappingURL=Image.js.map