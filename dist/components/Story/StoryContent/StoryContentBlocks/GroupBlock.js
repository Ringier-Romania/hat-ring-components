"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const StoryContentSwitcher_1 = require("../StoryContentSwitcher");
function GroupBlock({ blockData, widgetConfig, context }) {
    return (0, jsx_runtime_1.jsx)("section", { className: `GroupBlock align${blockData.alignment} ${blockData.name}`, children: (0, jsx_runtime_1.jsx)(StoryContentSwitcher_1.StoryContentSwitcher, { content: blockData.elements, widgetConfig: widgetConfig, context: context }) });
}
exports.default = GroupBlock;
//# sourceMappingURL=GroupBlock.js.map