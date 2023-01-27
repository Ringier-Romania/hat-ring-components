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
const RingImage_1 = __importStar(require("components/common/RingImage"));
function Image({ context, widgetConfig, data }) {
    var _a, _b;
    if (!data.image && !data.originalContent.image) {
        return null;
    }
    const sizes = widgetConfig.standardImageSize.split('x');
    return ((data.image || data.originalContent.image) ?
        (0, jsx_runtime_1.jsx)("div", { className: ['Image'].join(' '), children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { priority: false, alt: data.originalContent.image.caption || data.title || '', transform: RingImage_1.TransformType.ResizeCropAuto, src: ((_a = data.image) === null || _a === void 0 ? void 0 : _a.url) || ((_b = data.originalContent.image) === null || _b === void 0 ? void 0 : _b.url), width: Number(sizes[0]), height: Number(sizes[1]) }) }) :
        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = Image;
//# sourceMappingURL=Image.js.map