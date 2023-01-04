"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BasicWidgetFrontend_1 = require("../BasicWidgetFrontend");
const BasicWidgetButton_styles_1 = require("./BasicWidgetButton.styles");
function Button(props) {
    const { plainHtml, } = props;
    const { data, config } = (0, react_1.useContext)(BasicWidgetFrontend_1.BasicWidgetContext);
    const { moreText, moreUrl } = config;
    const button = moreUrl
        ? ((0, jsx_runtime_1.jsx)(BasicWidgetButton_styles_1.PrimaryButton, { href: moreUrl, children: moreText }))
        : ({ moreText });
    if (moreText && moreUrl) {
        return ((0, jsx_runtime_1.jsx)(BasicWidgetButton_styles_1.ButtonWrapper, { children: button }));
    }
    return null;
}
exports.default = Button;
//# sourceMappingURL=BasicWidgetButton.js.map