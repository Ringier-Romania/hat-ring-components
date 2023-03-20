"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = require("../../../../common/RingImage");
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Image({ itemIndex, context, widgetConfig, data }) {
    const image = data.image;
    if (!image || !image.url) {
        return WidgetHelper_1.WidgetHelper.renderEmptyComponent('Image');
    }
    const sizes = (widgetConfig.imageSize || '400x300').split('x');
    const ringImageProps = {
        src: image.url,
        alt: image.caption || data.title || '',
        transform: RingImage_1.TransformType.ResizeCropAuto,
        width: Number(sizes[0]),
        height: Number(sizes[1])
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Image'].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { ...ringImageProps }) }));
}
exports.default = Image;
Image.getFragment = (widgetConfig) => {
    const sizes = (widgetConfig.imageSize || '400x300').split('x');
    return {
        variables: {
            mainImageWidth: Number(sizes[0]),
            mainImageHeight: Number(sizes[1])
        },
        variablesTypes: {
            $mainImageWidth: 'Int!',
            $mainImageHeight: 'Int!',
        },
        query: (0, graphql_tag_1.default) `fragment ImageFragment on Story {
            image {
                url(transforms:{resizeCropAuto:{width:$mainImageWidth,height:$mainImageHeight}}),
                caption
            }
        }`
    };
};
//# sourceMappingURL=Image.js.map