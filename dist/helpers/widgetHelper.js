"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDisplayWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
async function handleDisplayWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean') {
        if ((context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformMobile)) {
            return ((0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: _.upperFirst(widgetConfig.widgetType), style: { display: 'none' } }) }));
        }
    }
}
exports.handleDisplayWidget = handleDisplayWidget;
//# sourceMappingURL=widgetHelper.js.map