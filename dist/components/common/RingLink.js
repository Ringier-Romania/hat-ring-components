"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
function RingLink(props) {
    let href = props.href;
    if (props.href && process.env.WEBSITE_DOMAIN && process.env.NODE_ENV === 'development') {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.WEBSITE_DOMAIN, '');
        }
    }
    return (0, jsx_runtime_1.jsx)(link_1.default, { ...props, href: href, children: props.children });
}
exports.RingLink = RingLink;
//# sourceMappingURL=RingLink.js.map