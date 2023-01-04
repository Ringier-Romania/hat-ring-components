"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const { OcdnUrl } = require('@ras-tech/ocdn');
function Image({ context, widgetConfig, data }) {
    if (!data.image) {
        return null;
    }
    const ocdnBucketName = process.env.OCDN_BUCKET_NAME;
    const ocdnTransformKey = process.env.OCDN_TRANSFORM_KEY;
    let imageUrl = data.image.url;
    if (ocdnBucketName && ocdnTransformKey) {
        const cropImage = new OcdnUrl();
        const sizes = widgetConfig.standardImageSize.split('x');
        cropImage.init(data.image.url);
        cropImage.setKey(ocdnTransformKey);
        cropImage.setBucket(ocdnBucketName);
        cropImage.resizeCropAuto(sizes[0], sizes[1]);
        imageUrl = cropImage.getUrl();
    }
    return (data.image ?
        (0, jsx_runtime_1.jsx)("div", { className: ['Image'].join(' '), children: (0, jsx_runtime_1.jsx)("img", { src: imageUrl }) }) :
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = Image;
//# sourceMappingURL=Image.js.map