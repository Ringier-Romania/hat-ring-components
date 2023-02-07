"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApplication = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cheerio = require('cheerio');
async function ExternalApplication({ widgetConfig, context }) {
    const res = await fetch(widgetConfig.controllerUrl);
    let html = await res.text();
    if (widgetConfig.selector) {
        const $ = cheerio.load(html);
        html = $(widgetConfig.selector).html();
    }
    return (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: html } });
}
exports.ExternalApplication = ExternalApplication;
//# sourceMappingURL=ExternalApplication.js.map