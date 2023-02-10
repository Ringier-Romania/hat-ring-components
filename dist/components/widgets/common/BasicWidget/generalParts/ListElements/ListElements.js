"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingLink_1 = __importDefault(require("../../../../../common/RingLink"));
const ListElementContent_1 = __importDefault(require("./ListElementContent"));
function ListElements({ context, widgetConfig, response }) {
    const colClass = Math.floor(12 / parseInt(widgetConfig.columns || '0'));
    return ((0, jsx_runtime_1.jsx)("div", { className: ['ListElements'].join(' '), children: widgetConfig.listElements && widgetConfig.listElements.map(element => {
            return (0, jsx_runtime_1.jsx)("div", { className: ['Item', 'col' + colClass].join(' '), children: element['Link url'] ?
                    (0, jsx_runtime_1.jsx)(RingLink_1.default, { href: element['Link url'], children: (0, jsx_runtime_1.jsx)(ListElementContent_1.default, { context: context, widgetConfig: widgetConfig, data: element }) }) :
                    (0, jsx_runtime_1.jsx)(ListElementContent_1.default, { context: context, widgetConfig: widgetConfig, data: element }) });
        }) }));
}
exports.default = ListElements;
//# sourceMappingURL=ListElements.js.map