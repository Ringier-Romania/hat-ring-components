"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = require("../../../../../common/RingImage");
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
        (0, jsx_runtime_1.jsx)("div", { className: ['ListElementsImage', (!imageWidth || !imageHeight) ? 'listElementsImageWrapper' : ''].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { ...ringImageProps, className: (!imageWidth || !imageHeight) ? 'listElementsImageFill' : '' }) }) :
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = ListElementsImage;
//# sourceMappingURL=ListElementsImage.js.map