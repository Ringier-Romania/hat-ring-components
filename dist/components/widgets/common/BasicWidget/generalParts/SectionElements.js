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
const ItemParts = __importStar(require("../itemParts"));
const _ = __importStar(require("lodash"));
const RingLink_1 = __importDefault(require("../../../../common/RingLink"));
const helpers_1 = require("../../../../../helpers");
function SectionElements({ context, widgetConfig, response }) {
    if (_.get(response, 'data.section.items.edges.length', 0) === 0) {
        return (0, helpers_1.renderEmptyComponent)('SectionElements');
    }
    const allItemParts = context.customData.itemParts || ItemParts;
    const columnsCount = parseInt(widgetConfig.columns);
    const bigElementsCount = Number(widgetConfig.countBig);
    const colNumber = Math.floor(12 / columnsCount);
    const bigElementsClass = bigElementsCount > 0 ? `bigElements${bigElementsCount}` : '';
    const columnsClass = columnsCount > 0 ? `columns${columnsCount}` : '';
    return ((0, jsx_runtime_1.jsx)("div", { className: ['SectionElements', bigElementsClass, columnsClass].join(' '), children: response.data.section.items.edges.map((edge, itemIndex) => {
            const itemParts = widgetConfig.showOptions.map((showOption, index) => {
                const Component = allItemParts[_.upperFirst(showOption)];
                if (!Component) {
                    console.error(`No item part support ${showOption}`);
                    return (0, helpers_1.renderEmptyComponent)(_.upperFirst(showOption), "item part not supported, yet");
                }
                return (0, jsx_runtime_1.jsx)(Component, { itemIndex: itemIndex, context: context, widgetConfig: widgetConfig, data: edge.node }, index);
            });
            const isBig = itemIndex < bigElementsCount;
            const colClass = isBig ? `col12` : `col${colNumber}`;
            const bigElementClass = isBig ? `bigElement` : '';
            return (0, jsx_runtime_1.jsx)("div", { className: ['Item', colClass, bigElementClass].join(' '), children: (0, jsx_runtime_1.jsx)(RingLink_1.default, { href: edge.node.url, children: itemParts }) });
        }) }));
}
exports.default = SectionElements;
//# sourceMappingURL=SectionElements.js.map