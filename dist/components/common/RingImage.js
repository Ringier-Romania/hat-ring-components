"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingImage = exports.TransformType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const { OcdnUrl } = require('@ras-tech/ocdn');
const RingImage_module_scss_1 = __importDefault(require("../../../styles/common/RingImage.module.scss"));
var TransformType;
(function (TransformType) {
    TransformType["ResizeCropAuto"] = "resizeCropAuto";
    TransformType["Resize"] = "resize";
    TransformType["None"] = "none";
})(TransformType = exports.TransformType || (exports.TransformType = {}));
function getPlaceholderData(width, height) {
    const _width = `width='${width || 16}'`;
    const _height = `height='${height || 9}'`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' ${_width} ${_height}></svg>`;
    return `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`;
}
function ocdnLoader(src, width, height, transformType) {
    const ocdnBucketName = process.env.OCDN_BUCKET_NAME;
    const ocdnTransformKey = process.env.OCDN_TRANSFORM_KEY;
    if (ocdnBucketName && ocdnTransformKey) {
        const cropImage = new OcdnUrl();
        cropImage.init(src);
        cropImage.setKey(ocdnTransformKey);
        cropImage.setBucket(ocdnBucketName);
        if (transformType === TransformType.Resize) {
            cropImage.resize(width, height);
        }
        else {
            cropImage.resizeCropAuto(width, height);
        }
        src = cropImage.getUrl();
    }
    return src;
}
function RingImage(props) {
    let src = props.src;
    let unoptimized = props.unoptimized;
    let blurDataURL = props.blurDataURL;
    let placeholder = props.placeholder;
    let transform = props.transform || TransformType.None;
    if (!props.fill) {
        blurDataURL = getPlaceholderData(props.width, props.height);
        placeholder = 'blur';
    }
    unoptimized = true;
    if (transform !== TransformType.None) {
        src = ocdnLoader(src, props.width, props.height, props.transform);
    }
    return (0, jsx_runtime_1.jsx)(image_1.default, { ...props, className: ['RingImage', RingImage_module_scss_1.default.RingImage, props.className].join(' '), src: src, width: props.width, height: props.height, unoptimized: unoptimized, placeholder: placeholder, blurDataURL: blurDataURL });
}
exports.RingImage = RingImage;
//# sourceMappingURL=RingImage.js.map