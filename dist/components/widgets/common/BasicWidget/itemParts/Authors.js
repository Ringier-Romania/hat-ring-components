"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RingImage_1 = require("../../../../common/RingImage");
const WidgetHelper_1 = require("../../../../../helpers/WidgetHelper");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
function Authors({ context, widgetConfig, data }) {
    var _a, _b, _c;
    const authorsObjs = ((_a = data.authors) === null || _a === void 0 ? void 0 : _a.map((name) => { return { name, image: { url: null, caption: null } }; })) || ((_c = (_b = data.originalContent) === null || _b === void 0 ? void 0 : _b.authors) === null || _c === void 0 ? void 0 : _c.map((obj) => obj.author));
    if (!authorsObjs || authorsObjs.length === 0) {
        return WidgetHelper_1.WidgetHelper.renderEmptyComponent('Authors');
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: ['Authors'].join(' '), children: authorsObjs.map((author) => {
            var _a;
            return ((0, jsx_runtime_1.jsxs)("div", { className: "authorWrapper", children: [((_a = author.image) === null || _a === void 0 ? void 0 : _a.url) &&
                        (0, jsx_runtime_1.jsx)("div", { className: "authorImage", children: (0, jsx_runtime_1.jsx)(RingImage_1.RingImage, { src: author.image.url, alt: author.image.caption || author.name, width: 100, height: 100, transform: RingImage_1.TransformType.ResizeCropAuto }) }), author.name &&
                        (0, jsx_runtime_1.jsx)("div", { className: "authorName", children: author.name })] }));
        }) }));
}
exports.default = Authors;
Authors.getFragment = () => {
    return {
        variables: {},
        query: (0, graphql_tag_1.default) `fragment AuthorsFragment on SectionItem {
            authors {
                name
            }
            originalContent {
                ... on Story {
                    authors {
                        author {
                            name
                            image {
                                url
                                caption
                            }
                        }
                    }
                }
            }
        }`
    };
};
//# sourceMappingURL=Authors.js.map