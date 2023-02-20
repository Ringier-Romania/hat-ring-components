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
const RingImage_1 = __importStar(require("../../../../common/RingImage"));
const WidgetHelper_1 = __importDefault(require("../../../../../helpers/WidgetHelper"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Image({ itemIndex, context, widgetConfig, data }) {
    var _a;
    const image = data.image || ((_a = data.originalContent) === null || _a === void 0 ? void 0 : _a.image);
    if (!image || !image.url) {
        return WidgetHelper_1.default.renderEmptyComponent('Image');
    }
    const isBig = widgetConfig.countBig ? itemIndex < widgetConfig.countBig : false;
    const sizes = isBig ? (widgetConfig.bigImageSize || '0x0').split('x') : (widgetConfig.standardImageSize || '0x0').split('x');
    const ringImageProps = {
        src: image.url,
        alt: image.caption || data.title || '',
        transform: RingImage_1.TransformType.ResizeCropAuto,
        width: Number(sizes[0]),
        height: Number(sizes[1])
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Image', isBig ? 'bigImage' : ''].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { ...ringImageProps }) }));
}
exports.default = Image;
Image.getFragment = (widgetConfig) => {
    return {
        query: (0, graphql_tag_1.default) `fragment ImageFragment on SectionItem {
            image {
                url,
                caption
            }
            originalContent {
                ... on Story {
                    image {
                        url,
                        caption
                    }
                }
            }
        }`
    };
};
//# sourceMappingURL=Image.js.map