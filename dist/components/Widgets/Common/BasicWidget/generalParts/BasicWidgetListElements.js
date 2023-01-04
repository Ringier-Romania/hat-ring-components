"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BasicWidgetFrontend_1 = require("../BasicWidgetFrontend");
function BasicWidgetHeader(props) {
    const { showOptions, } = props;
    const { data, config } = (0, react_1.useContext)(BasicWidgetFrontend_1.BasicWidgetContext);
    const { headerSeoTag, listElements } = config;
    return ((0, jsx_runtime_1.jsx)("div", { className: "row", children: listElements.map(item => {
            return ((0, jsx_runtime_1.jsx)("div", { className: "md:col-4", children: (0, jsx_runtime_1.jsxs)("a", { href: (item['Link url'] || '').replace('https://demo-ring.com/', '/'), style: { color: 'black' }, children: [(0, jsx_runtime_1.jsx)("img", { style: { maxWidth: '100%', height: 'auto' }, src: item['Image src'] }), (0, jsx_runtime_1.jsx)("h4", { children: item.Title }), (0, jsx_runtime_1.jsx)("p", { children: item.Description }), (0, jsx_runtime_1.jsx)("p", { children: item.Text })] }) }));
        }) }));
}
exports.default = BasicWidgetHeader;
//# sourceMappingURL=BasicWidgetListElements.js.map