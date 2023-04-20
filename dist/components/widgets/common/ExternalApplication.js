"use strict";
"use server";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApplication = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const WidgetHelper_1 = require("../../../helpers/WidgetHelper");
const cheerio = require('cheerio');
;
async function ExternalApplication({ widgetConfig, context }) {
    const _widgetConfig = { ...widgetConfig };
    const res = await fetch(_widgetConfig.controllerUrl);
    let html = await res.text();
    if (_widgetConfig.blockName) {
        _widgetConfig.selector = `[name="${_widgetConfig.blockName}"]`;
    }
    if (_widgetConfig.selector) {
        const $ = cheerio.load(html);
        html = $(_widgetConfig.selector).html();
    }
    return (0, jsx_runtime_1.jsx)("div", { className: WidgetHelper_1.WidgetHelper.getWidgetCssClasses(_widgetConfig), dangerouslySetInnerHTML: { __html: html } });
}
exports.ExternalApplication = ExternalApplication;
//# sourceMappingURL=ExternalApplication.js.map