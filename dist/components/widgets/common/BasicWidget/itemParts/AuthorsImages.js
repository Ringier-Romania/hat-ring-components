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
function AuthorsImages({ context, widgetConfig, data }) {
    var _a, _b;
    const authorsObjs = (_b = (_a = data.originalContent) === null || _a === void 0 ? void 0 : _a.authors) === null || _b === void 0 ? void 0 : _b.map((obj) => obj.author);
    if (!authorsObjs || authorsObjs.length === 0) {
        return (0, jsx_runtime_1.jsx)("div", { className: 'AuthorsImages', style: { display: 'none' } });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['AuthorsImages'].join(' '), children: authorsObjs.map((author) => {
            var _a;
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: ((_a = author.image) === null || _a === void 0 ? void 0 : _a.url) &&
                    (0, jsx_runtime_1.jsx)("div", { className: "authorImage", children: (0, jsx_runtime_1.jsx)(RingImage_1.default, { src: author.image.url, alt: author.image.caption || author.name, width: 100, height: 100, transform: RingImage_1.TransformType.ResizeCropAuto }) }) }));
        }) }));
}
exports.default = AuthorsImages;
//# sourceMappingURL=AuthorsImages.js.map