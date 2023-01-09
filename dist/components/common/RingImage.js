"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocdnLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const { OcdnUrl } = require('@ras-tech/ocdn');
function ocdnLoader({ src, width, quality }) {
    const ocdnBucketName = process.env.OCDN_BUCKET_NAME;
    const ocdnTransformKey = process.env.OCDN_TRANSFORM_KEY;
    if (ocdnBucketName && ocdnTransformKey) {
        const cropImage = new OcdnUrl();
        cropImage.init(src);
        cropImage.setKey(ocdnTransformKey);
        cropImage.setBucket(ocdnBucketName);
        cropImage.resizeCropAuto(200, 120);
        src = cropImage.getUrl();
    }
    return src;
}
exports.ocdnLoader = ocdnLoader;
function RingImage(props) {
    return (0, jsx_runtime_1.jsx)(image_1.default, { ...props, loader: ocdnLoader });
}
exports.default = RingImage;
//# sourceMappingURL=RingImage.js.map