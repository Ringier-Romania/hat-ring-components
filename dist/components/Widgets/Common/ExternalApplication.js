"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApplication = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
async function ExternalApplication({ widgetConfig, context }) {
    const res = await fetch(widgetConfig.controllerUrl);
    const html = await res.text();
    return (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: html } });
}
exports.ExternalApplication = ExternalApplication;
//# sourceMappingURL=ExternalApplication.js.map