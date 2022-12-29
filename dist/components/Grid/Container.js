"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Box_1 = require("./Box");
;
function Container({ sectionName, sectionConfig, context, boxes }) {
    const ContainerTag = `${sectionConfig.container_html_tag || 'main'}`;
    return (0, jsx_runtime_1.jsx)(ContainerTag, { className: ['gridContainer', sectionName].join(' '), children: boxes.map(boxName => {
            return (0, jsx_runtime_1.jsx)(Box_1.Box, { context: context, boxName: boxName, widgets: sectionConfig[boxName], size: sectionConfig[boxName + '_size'], tagName: sectionConfig[boxName + '_htmlTag'] });
        }) });
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map