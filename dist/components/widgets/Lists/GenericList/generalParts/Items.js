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
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
const ItemParts = __importStar(require("./../itemParts"));
const _ = __importStar(require("lodash"));
const RingLink_1 = require("../../../../common/RingLink");
function Items({ context, widgetConfig, response, extendableAttributes }) {
    var _a, _b;
    const allItemParts = extendableAttributes.itemParts || ItemParts;
    const columnsCount = widgetConfig.columns || 1;
    const colNumber = Math.floor(12 / columnsCount);
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Items'].join(' '), children: ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.stories) === null || _b === void 0 ? void 0 : _b.edges.map((edge, itemIndex) => {
            var _a, _b;
            const itemParts = widgetConfig.showOptions && widgetConfig.showOptions.map((showOption, index) => {
                const Component = allItemParts[_.upperFirst(showOption)];
                if (!Component) {
                    console.error(`No item part support ${showOption}`);
                    return WidgetHelper_1.WidgetHelper.renderEmptyComponent(_.upperFirst(showOption), "item part not supported, yet");
                }
                return (0, jsx_runtime_1.jsx)(Component, { itemIndex: itemIndex, context: context, widgetConfig: widgetConfig, data: edge.node }, index);
            });
            const colClass = `col${colNumber}`;
            return (0, jsx_runtime_1.jsx)("div", { className: ['Item', colClass].join(' '), children: (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { href: ((_b = (_a = edge.node) === null || _a === void 0 ? void 0 : _a.mainPublicationPoint) === null || _b === void 0 ? void 0 : _b.url) || '#', children: itemParts }) });
        })) }));
}
exports.default = Items;
//# sourceMappingURL=Items.js.map