"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const script_1 = __importDefault(require("next/script"));
function Embedded_applicationBlock({ blockData }) {
    (0, react_1.useEffect)(() => {
        if (window.pulsembed) {
            window.pulsembed();
        }
    }, []);
    return (0, jsx_runtime_1.jsxs)("div", { className: "embeddedApplicationBlock", children: [(0, jsx_runtime_1.jsx)(script_1.default, { id: "pulseembed", src: "https://pulsembed.eu/pulsembed.js", strategy: "lazyOnload" }), (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: blockData.embed.html } })] });
}
exports.default = Embedded_applicationBlock;
//# sourceMappingURL=EmbeddedApplicationBlock.js.map