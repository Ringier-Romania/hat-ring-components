"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const locale_1 = require("date-fns/esm/locale");
function PublicationDate({ context, widgetConfig, data }) {
    const dateFromData = data.creationTime || data.originalContent.creationTime;
    if (dateFromData) {
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
        return ((0, jsx_runtime_1.jsx)("div", { className: ['PublicationDate'].join(' '), children: (0, jsx_runtime_1.jsx)("time", { dateTime: (0, date_fns_1.formatISO)(date), children: relativeDate }) }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
exports.default = PublicationDate;
//# sourceMappingURL=PublicationDate.js.map