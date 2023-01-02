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
const graphql_api_client_1 = require("@ringpublishing/graphql-api-client");
const graphql_tag_1 = require("graphql-tag");
async function StoryTitle(params) {
    var _a;
    const accessKey = process.env.WEBSITE_API_PUBLIC;
    const secretKey = process.env.WEBSITE_API_SECRET;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID;
    const query = (0, graphql_tag_1.gql) `
        query($storyId: UUID){
            story(id:$storyId){
                name
            }
        }
    `;
    const variables = {
        storyId: (_a = params.context.controllerParams.gqlResponse.data) === null || _a === void 0 ? void 0 : _a.site.data.content.id
    };
    const websitesApiClient = new graphql_api_client_1.WebsitesApiClient({ accessKey, secretKey, spaceUuid });
    const response = await websitesApiClient.query(query, variables);
    const title = _.get(response, 'data.story.name');
    return (0, jsx_runtime_1.jsx)("h1", { children: title });
}
exports.StoryTitle = StoryTitle;
//# sourceMappingURL=StoryTitle.js.map