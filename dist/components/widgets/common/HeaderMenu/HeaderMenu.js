"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RingLink_1 = require("../../../common/RingLink");
const RingImage_1 = require("../../../common/RingImage");
;
function HeaderMenu({ widgetConfig, context }) {
    function renderMenuElement(menuElement) {
        const item = (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: 'text', children: menuElement.text }), menuElement["image url"] &&
                    (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { src: menuElement["image url"], alt: menuElement.text, width: 200, height: 200 }), menuElement.children && menuElement.children.length > 0 &&
                    (0, jsx_runtime_1.jsx)("ul", { children: menuElement.children.map((menuElement) => {
                            return renderMenuElement(menuElement);
                        }) })] });
        return menuElement.hidden ? null : (0, jsx_runtime_1.jsx)("li", { className: menuElement["custom css class"], children: menuElement.url ?
                (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { href: menuElement.url, target: menuElement["open in new tab"] ? '_blank' : '', children: item }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: item }) });
    }
    return (0, jsx_runtime_1.jsx)("nav", { className: ['HeaderMenu', widgetConfig.customClass].join(' '), style: { color: widgetConfig.textColor }, children: (0, jsx_runtime_1.jsx)("ul", { children: widgetConfig.overrideMenuElements.map((menuElement) => {
                return renderMenuElement(menuElement);
            }) }) });
}
exports.HeaderMenu = HeaderMenu;
//# sourceMappingURL=HeaderMenu.js.map