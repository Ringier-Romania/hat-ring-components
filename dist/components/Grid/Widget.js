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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
const WidgetHelper_1 = __importDefault(require("../../helpers/WidgetHelper"));
;
function Widget({ widgetConfig, context }) {
    const availableWidgets = context.customData.widgets;
    const widgetName = _.upperFirst(widgetConfig.widgetType);
    const Component = availableWidgets[widgetName];
    if (!Component) {
        console.error(`No widget with name ${widgetConfig.widgetType}`);
        return WidgetHelper_1.default.renderEmptyComponent(`gridWidget ${widgetName}`, 'No widget found');
    }
    if (WidgetHelper_1.default.shouldHideWidget(widgetConfig, context)) {
        console.log(widgetName, widgetConfig, context.hatControllerParams.isMobile);
        return WidgetHelper_1.default.renderEmptyComponent(`gridWidget ${widgetName}`);
    }
    return (0, jsx_runtime_1.jsx)("div", { className: WidgetHelper_1.default.getWidgetCssClasses(widgetConfig, ['gridWidget']), children: (0, jsx_runtime_1.jsx)(Component, { widgetConfig: widgetConfig, context: context }) });
}
exports.Widget = Widget;
//# sourceMappingURL=Widget.js.map