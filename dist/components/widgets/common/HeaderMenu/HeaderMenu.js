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
exports.HeaderMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const RingLink_1 = require("../../../common/RingLink");
const RingImage_1 = require("../../../common/RingImage");
const HeaderMenu_module_scss_1 = __importDefault(require("../../../../../styles/widgets/common/HeaderMenu.module.scss"));
;
function HeaderMenu({ widgetConfig, context }) {
    function renderMenuElement(menuElement) {
        const item = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: 'text', children: menuElement.text }), menuElement["image url"] &&
                    (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { src: menuElement["image url"], alt: menuElement.text, width: 200, height: 200 }), menuElement.children && menuElement.children.length > 0 &&
                    (0, jsx_runtime_1.jsx)("ul", { children: menuElement.children.map((menuElement) => {
                            return renderMenuElement(menuElement);
                        }) })] });
        const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname') || context.url;
        const isActive = currentUrl == menuElement.url;
        return menuElement.hidden ? null :
            (0, jsx_runtime_1.jsx)("li", { className: [menuElement["custom css class"], isActive ? 'active' : ''].join(' '), children: menuElement.url ?
                    (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { href: menuElement.url, target: menuElement["open in new tab"] ? '_blank' : '', children: item }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: item }) });
    }
    return (0, jsx_runtime_1.jsx)("nav", { className: ['HeaderMenu', widgetConfig.customClass, HeaderMenu_module_scss_1.default.HeaderMenu].join(' '), children: (0, jsx_runtime_1.jsx)("ul", { children: widgetConfig.overrideMenuElements.map((menuElement) => {
                return renderMenuElement(menuElement);
            }) }) });
}
exports.HeaderMenu = HeaderMenu;
//# sourceMappingURL=HeaderMenu.js.map