"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsHelper = void 0;
class UtilsHelper {
    static convertToInt(input) {
        return typeof input === "number" ? input : parseInt(input);
    }
    static isMobile(context) {
        var _a;
        return !!((_a = context.hatControllerParams) === null || _a === void 0 ? void 0 : _a.isMobile);
    }
    static isDevelopmentMode() {
        return process.env.NODE_ENV === 'development';
    }
}
exports.UtilsHelper = UtilsHelper;
//# sourceMappingURL=UtilsHelper.js.map