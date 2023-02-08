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
const _ = __importStar(require("lodash"));
const helpers_1 = require("../../../../../helpers");
function Title({ context, widgetConfig, data }) {
    if (!data.title) {
        return (0, helpers_1.renderEmptyComponent)('Title');
    }
    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span');
    let ItemHeaderTag = HeaderTag;
    const itemsHeaderArr = HeaderTag.split('h');
    if (itemsHeaderArr.length === 2) {
        const tagLevel = Number(itemsHeaderArr[1]);
        if (tagLevel === 6) {
            ItemHeaderTag = 'span';
        }
        else {
            ItemHeaderTag = `h${_.clamp(tagLevel + 1, 2, 6)}`;
        }
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Title'].join(' '), children: (0, jsx_runtime_1.jsx)(ItemHeaderTag, { children: data.title }) }));
}
exports.default = Title;
//# sourceMappingURL=Title.js.map