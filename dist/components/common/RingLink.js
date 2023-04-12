"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const UtilsHelper_1 = require("../../helpers/UtilsHelper");
function RingLink(props) {
    let href = props.href;
    if (props.href && process.env.NEXT_PUBLIC_WEBSITE_DOMAIN && UtilsHelper_1.UtilsHelper.isDevelopmentMode()) {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN, '');
        }
    }
    let prefetch = props.prefetch;
    prefetch = false;
    return (0, jsx_runtime_1.jsx)(link_1.default, { ...props, href: href, prefetch: prefetch, children: props.children });
}
exports.RingLink = RingLink;
//# sourceMappingURL=RingLink.js.map