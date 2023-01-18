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
exports.StoryContentSwitcher = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const BlocksTypes = __importStar(require("./StoryContentBlocks"));
function StoryContentSwitcher({ content, config, context }) {
    let isGroupBlock = false;
    const groupElements = [];
    return content.map((block) => {
        if (block.type === 'groupStart') {
            isGroupBlock = true;
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        }
        if (block.type === 'groupEnd') {
            isGroupBlock = false;
            block.type = 'group';
            block.elements = [...groupElements];
        }
        if (isGroupBlock === true) {
            groupElements.push(block);
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        }
        const blockType = block.type ? _.upperFirst(_.camelCase(block.type)) + 'Block' : 'NotHandledBlock';
        const Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];
        return (0, jsx_runtime_1.jsx)(Block, { blockData: block, config: config, context: context });
    });
}
exports.StoryContentSwitcher = StoryContentSwitcher;
//# sourceMappingURL=StoryContentSwitcher.js.map