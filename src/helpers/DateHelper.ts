import dayjs from "dayjs";
import _ from "lodash";
import { ConfigHelper_getDateFormatConfig, ConfigHelper_getLanguage } from "./ConfigHelper";
import { AppContext } from "../types/types";
import utc from "dayjs/plugin/utc";
import calendar from "dayjs/plugin/calendar";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/es";
import "dayjs/locale/pl";
export async function DateHelper_convertDate(
    context: AppContext,
    date: string,
    format = null as string | null
): Promise<string> {
    const dateSettings = await ConfigHelper_getDateFormatConfig(context);
    const destinationLanguage = await ConfigHelper_getLanguage(context);
    importDayJs(destinationLanguage);
    const timeZone = dateSettings ? dateSettings.timeZone : "Europe/London";
    // @ts-ignore
    let dateJsObj = dayjs(date).tz(timeZone);
    if (format) {
        return dateJsObj.format(format);
    }

    if (dateSettings && dateSettings.useExtendedDatesFormat) {
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
    dayjs.extend(utc);
    dayjs.extend(timezone);
    //@TODO refactor
    dayjs.locale(locale);
}


export async function DateHelper_fromNow(context: AppContext, date: string | Date, dateTemplate?: any): Promise<string> {
    dayjs.extend(relativeTime);
    const destinationLanguage = await ConfigHelper_getLanguage(context);
    importDayJs(destinationLanguage);
    const dateSettings = await ConfigHelper_getDateFormatConfig(context);
    const timeZone =  dateSettings ? dateSettings.timeZone : "Europe/London";
    
    if (dateTemplate) {
        const localLocale = {
            ...dayjs.Ls[destinationLanguage],
            //temporary name field for additional dateTemplate to avoid global configuration change
            name: `fromNow-temp`,
            relativeTime: dateTemplate.relativeTime,
        };
        return dayjs(date).tz(timeZone).locale(localLocale).fromNow();
    }
    return dayjs(date).tz(timeZone).locale(destinationLanguage).fromNow();
}
