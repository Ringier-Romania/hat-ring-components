"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const BasicWidgetFrontend_1 = require("../BasicWidgetFrontend");
function BasicWidgetDescription(props) {
    const { plainHtml, } = props;
    return ((0, jsx_runtime_1.jsx)(BasicWidgetFrontend_1.BasicWidgetContext.Consumer, { children: (context) => {
            const { data, config } = context;
            const { description } = config;
            if (description) {
                return ((0, jsx_runtime_1.jsx)("p", { className: "main-section-description", children: description }));
            }
            return null;
        } }));
}
exports.default = BasicWidgetDescription;
//# sourceMappingURL=BasicWidgetDescription.js.map