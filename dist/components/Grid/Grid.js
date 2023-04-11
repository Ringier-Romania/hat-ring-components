"use strict";
"use server";
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
exports.Grid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const graphql_tag_1 = require("graphql-tag");
const _ = __importStar(require("lodash"));
const Container_1 = require("./Container");
const WebsiteApiProvider_1 = require("../../providers/WebsiteApiProvider");
const UtilsHelper_1 = require("../../helpers/UtilsHelper");
async function Grid(params) {
    const variant = process.env.WEBSITE_API_VARIANT;
    const domain = process.env.WEBSITE_DOMAIN;
    if (!params.config.boxes) {
        params.config.boxes = ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom'];
    }
    let variablesQuery = '';
    let configQuery = '';
    params.config.containers.forEach(section => {
        configQuery += section + ':config(codeName: "' + section + '"){ data } ';
    });
    const antycache = UtilsHelper_1.UtilsHelper.isDevelopmentMode() ? `antycacheStatusCode${new Date().getTime()}` : 'antycacheStatusCode';
    const query = (0, graphql_tag_1.gql) `
        query($url: URL!, $variant:ID!){
            site(url:$url, variantId: $variant){
                ${antycache}:statusCode
                data {
                    node {
                        config {
                            ${configQuery}
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        url: domain + params.context.url,
        variant: variant,
    };
    const response = await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    const sectionsConfig = _.get(response, 'data.site.data.node.config');
    return params.config.containers.map(sectionName => (0, jsx_runtime_1.jsx)(Container_1.Container, { context: params.context, boxes: params.config.boxes, sectionName: sectionName, sectionConfig: _.get(sectionsConfig, `${sectionName}.0.data`) }));
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map