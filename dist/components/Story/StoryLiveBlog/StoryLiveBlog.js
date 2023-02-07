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
exports.StoryLiveBlog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const graphql_tag_1 = require("graphql-tag");
const WebsiteApiProvider_1 = require("../../../providers/WebsiteApiProvider");
const ExternalApplication_1 = require("../../widgets/common/ExternalApplication");
async function StoryLiveBlog({ config, context }) {
    const variant = process.env.WEBSITE_API_VARIANT;
    const domain = process.env.WEBSITE_DOMAIN;
    const query = (0, graphql_tag_1.gql) `
        query($extType: String, $url: URL!, $variant: ID!){
            site(url: $url, variantId: $variant){

                data {
                    node {
                        config {
                            config(codeName: "liveBlog"){ data }
                        }
                    }
                    content {
                        ...on Story{
                            extensions(type:$extType){
                                data
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        extType: 'liveblog',
        url: domain + context.url,
        variant,
    };
    const response = await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    const platformUrl = _.get(response, 'data.site.data.node.config.config[0].data.liveBlogPlatformUrl', false);
    const productKey = _.get(response, 'data.site.data.node.config.config[0].data.liveBlogClientId', false);
    const productLanguage = _.get(response, 'data.site.data.node.config.config[0].data.liveBlogLanguage', false);
    const liveblogUuid = _.get(response, 'data.site.data.content.extensions[0].data.id', false);
    if (!(platformUrl && productKey && productLanguage && liveblogUuid)) {
        return (0, jsx_runtime_1.jsx)("div", { style: { display: 'none' }, children: "Problem with fetching liveblog data" });
    }
    let url = `${platformUrl}/${liveblogUuid},${productLanguage},${productKey},liveblog.html`;
    return (0, jsx_runtime_1.jsx)("div", { className: "StoryLiveBlog", children: (0, jsx_runtime_1.jsx)(ExternalApplication_1.ExternalApplication, { widgetConfig: { controllerUrl: url }, context: context }) });
}
exports.StoryLiveBlog = StoryLiveBlog;
//# sourceMappingURL=StoryLiveBlog.js.map