"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingLink_1 = require("../../../../common/RingLink");
const _ = __importStar(require("lodash"));
const UtilsHelper_1 = require("../../../../../helpers/UtilsHelper");
function Pagination({ context, widgetConfig, response, currentPage }) {
    var _a;
    const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname');
    const total = (_a = response.data) === null || _a === void 0 ? void 0 : _a.stories.total;
    const pages = Math.ceil(total / UtilsHelper_1.UtilsHelper.convertToInt(widgetConfig.paginationElements));
    if (pages === 1) {
        return null;
    }
    let buttons = [];
    if (currentPage > 1) {
        buttons.push((0, jsx_runtime_1.jsx)("li", { className: ['prev'].join(' '), children: (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { rel: 'prev', href: currentUrl + '?page=' + (currentPage - 1), children: "<" }) }));
    }
    for (let i = 1; i < pages + 1; i++) {
        buttons.push((0, jsx_runtime_1.jsx)("li", { className: currentPage == i ? 'active' : '', children: (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { href: currentUrl + '?page=' + i, children: i }) }));
    }
    if (currentPage < pages) {
        buttons.push((0, jsx_runtime_1.jsx)("li", { className: ['prev'].join(' '), children: (0, jsx_runtime_1.jsx)(RingLink_1.RingLink, { rel: 'next', href: currentUrl + '?page=' + (currentPage + 1), children: ">" }) }));
    }
    return ((0, jsx_runtime_1.jsx)("ul", { className: ['Pagination'].join(' '), children: buttons }));
}
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map