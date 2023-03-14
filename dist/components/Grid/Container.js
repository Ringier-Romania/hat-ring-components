"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Box_1 = require("./Box");
const Grid_module_scss_1 = __importDefault(require("../../../styles/Grid/Grid.module.scss"));
;
function Container({ sectionName, sectionConfig, context, boxes }) {
    if (!sectionConfig) {
        return null;
    }
    const ContainerTag = `${sectionConfig.container_html_tag || 'main'}`;
    return (0, jsx_runtime_1.jsx)(ContainerTag, { className: ['gridContainer', sectionName, Grid_module_scss_1.default.gridContainer].join(' '), children: boxes.map(boxName => {
            return !!sectionConfig[boxName + '_hide'] ? null :
                (0, jsx_runtime_1.jsx)(Box_1.Box, { context: context, boxName: boxName, widgets: sectionConfig[boxName], size: sectionConfig[boxName + '_size'], tagName: sectionConfig[boxName + '_html_tag'] });
        }) });
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map