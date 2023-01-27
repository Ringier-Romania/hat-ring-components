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
exports.StoryTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const graphql_tag_1 = require("graphql-tag");
const WebsiteApiProvider_1 = require("providers/WebsiteApiProvider");
async function StoryTitle(params) {
    const query = (0, graphql_tag_1.gql) `
        query($storyId: UUID){
            story(id:$storyId){
                name
            }
        }
    `;
    const variables = {
        storyId: params.context.id,
    };
    const response = await WebsiteApiProvider_1.WebsiteApiProvider.call(query, variables);
    const title = _.get(response, 'data.story.name');
    return (0, jsx_runtime_1.jsx)("h1", { children: title });
}
exports.StoryTitle = StoryTitle;
//# sourceMappingURL=StoryTitle.js.map