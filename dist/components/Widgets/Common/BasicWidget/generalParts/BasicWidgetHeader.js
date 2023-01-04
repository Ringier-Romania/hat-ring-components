"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const BasicWidgetFrontend_1 = require("../BasicWidgetFrontend");
function BasicWidgetHeader(props) {
    const { plainHtml, } = props;
    return ((0, jsx_runtime_1.jsx)(BasicWidgetFrontend_1.BasicWidgetContext.Consumer, { children: (context) => {
            const { data, config } = context;
            const { labelValue, headerSeoTag } = config;
            const CustomTag = headerSeoTag ? `${headerSeoTag}` : 'span';
            return (0, jsx_runtime_1.jsx)(CustomTag, { className: "main-section-title", children: labelValue }, 'BW-header-' + labelValue);
        } }));
}
exports.default = BasicWidgetHeader;
//# sourceMappingURL=BasicWidgetHeader.js.map