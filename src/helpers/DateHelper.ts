import dayjs from "dayjs";
import {ConfigHelper_getDateFormatConfig, ConfigHelper_getLanguage} from "./ConfigHelper";
import {AppContext} from "../types/types";

export async function DateHelper_convertDate(context: AppContext, date: string, format = null as string | null): Promise<string> {

    const dateSettings = await ConfigHelper_getDateFormatConfig(context);
    const destinationLanguage = await ConfigHelper_getLanguage(context);
    importDayJs(destinationLanguage);
    const timeZone = dateSettings ? dateSettings.timeZone : "Europe/London";
    // @ts-ignore
    let dateJsObj = dayjs(date).locale(destinationLanguage).tz(timeZone);

    if (format) {
        return dateJsObj.format(format);
    }

    if (dateSettings && dateSettings.useExtendedDatesFormat) {
        var calendar = require('dayjs/plugin/calendar')
        dayjs.extend(calendar)
        // @ts-ignore
        dateJsObj = dateJsObj.calendar(null, {
            sameDay: dateSettings.sameDay,
            nextDay: dateSettings.nextDay,
            nextWeek: dateSettings.nextWeek,
            lastDay: dateSettings.lastDay,
            lastWeek: dateSettings.lastWeek,
            sameElse: dateSettings.sameElse
        });

        return dateJsObj;
    }

    return dateJsObj.format('DD-MM-YYYY, HH:MM:ss');

}

function importDayJs(locale: string) {
    var utc = require('dayjs/plugin/utc');
    var timezone = require('dayjs/plugin/timezone');
    dayjs.extend(utc);
    dayjs.extend(timezone);
    //@TODO refactor
    switch (locale) {
        case 'en':
            require('dayjs/locale/en');
            break;
        case 'pl':
            require('dayjs/locale/pl');
            break;
        case 'de':
            require('dayjs/locale/de');
            break;
        case 'fr':
            require('dayjs/locale/fr');
            break;
    }
}
