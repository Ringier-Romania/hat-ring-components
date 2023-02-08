"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const locale_1 = require("date-fns/esm/locale");
const _helpers_1 = require("@helpers");
function ModificationDate({ context, widgetConfig, data }) {
    const dateFromData = data.modificationTime || data.originalContent.modificationTime;
    if (!dateFromData) {
        return (0, _helpers_1.renderEmptyComponent)('ModificationDate');
    }
    const decoratedLocale = {
        ...locale_1.enGB,
        formatRelative: (...args) => {
            if (args && args[0] === 'other') {
                return 'LLLL d. yyyy, h:mm:ss a';
            }
            return locale_1.enGB.formatRelative(...args);
        },
    };
    const options = {
        locale: decoratedLocale,
        timeZone: 'Europe/London'
    };
    const date = (0, date_fns_tz_1.toDate)(dateFromData, options);
    const relativeDate = (0, date_fns_1.formatRelative)(date, new Date(), options);
    return ((0, jsx_runtime_1.jsx)("div", { className: ['ModificationDate'].join(' '), children: (0, jsx_runtime_1.jsx)("time", { dateTime: (0, date_fns_1.formatISO)(date), children: relativeDate }) }));
}
exports.default = ModificationDate;
//# sourceMappingURL=ModificationDate.js.map