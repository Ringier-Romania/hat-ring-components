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
exports.getWidgetCssClasses = exports.renderEmptyComponent = exports.renderEmptyWidget = exports.shouldHideWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _ = __importStar(require("lodash"));
function shouldHideWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean') {
        return !((context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformMobile));
    }
    return false;
}
exports.shouldHideWidget = shouldHideWidget;
function renderEmptyWidget(widgetConfig, text = '') {
    return renderEmptyComponent(_.upperFirst(widgetConfig.widgetType), text);
}
exports.renderEmptyWidget = renderEmptyWidget;
function renderEmptyComponent(componentClassName, text = '') {
    return ((0, jsx_runtime_1.jsx)("div", { className: componentClassName, style: { display: 'none' }, dangerouslySetInnerHTML: { __html: text && `<!-- ${text} -->` } }));
}
exports.renderEmptyComponent = renderEmptyComponent;
function getWidgetCssClasses(widgetConfig, additionalCssClasses = []) {
    const cssClasses = [];
    if (widgetConfig.widgetType) {
        cssClasses.push(_.upperFirst(widgetConfig.widgetType));
    }
    if (widgetConfig.customWidth && widgetConfig.customWidth !== 'none') {
        cssClasses.push(`widgetWidth${widgetConfig.customWidth}`);
    }
    if (widgetConfig.customPosition && widgetConfig.customPosition !== 'none') {
        cssClasses.push(`widgetPosition${_.upperFirst(widgetConfig.customPosition)}`);
    }
    if (widgetConfig.customClass && widgetConfig.customClass !== '') {
        cssClasses.push(widgetConfig.customClass);
    }
    return [...additionalCssClasses, ...cssClasses].join(' ');
}
exports.getWidgetCssClasses = getWidgetCssClasses;
//# sourceMappingURL=index.js.map