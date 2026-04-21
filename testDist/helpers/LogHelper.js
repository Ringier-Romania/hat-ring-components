"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHelper_error = LogHelper_error;
exports.LogHelper_warn = LogHelper_warn;
exports.LogHelper_info = LogHelper_info;
exports.LogHelper_debug = LogHelper_debug;
exports.LogHelper_getLevel = LogHelper_getLevel;
exports.LogHelper_isLevelEnabled = LogHelper_isLevelEnabled;
const UtilsHelper_1 = require("./UtilsHelper");
const LOG_LEVEL_VALUES = {
    silent: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
};
function getConfiguredLogLevel() {
    const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
    var _a;
    return (_a = LOG_LEVEL_VALUES[envLevel]) !== null && _a !== void 0 ? _a : LOG_LEVEL_VALUES.info;
}
function shouldLog(level) {
    return LOG_LEVEL_VALUES[level] <= getConfiguredLogLevel();
}
function formatArgs(args) {
    return args.map(arg => {
        if (arg instanceof Error) {
            return (0, UtilsHelper_1.UtilsHelper_getErrorMessage)(arg);
        }
        return arg;
    });
}
function LogHelper_error(message, ...args) {
    if (shouldLog('error')) {
        console.error(message, ...formatArgs(args));
    }
}
function LogHelper_warn(message, ...args) {
    if (shouldLog('warn')) {
        console.warn(message, ...formatArgs(args));
    }
}
function LogHelper_info(message, ...args) {
    if (shouldLog('info')) {
        console.info(message, ...formatArgs(args));
    }
}
function LogHelper_debug(message, ...args) {
    if (shouldLog('debug')) {
        console.log(message, ...formatArgs(args));
    }
}
function LogHelper_getLevel() {
    const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
    return LOG_LEVEL_VALUES[envLevel] !== undefined ? envLevel : 'info';
}
function LogHelper_isLevelEnabled(level) {
    return shouldLog(level);
}

