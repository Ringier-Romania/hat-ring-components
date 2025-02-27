import dayjs from "dayjs";
import { ConfigHelper_getDateFormatConfig, ConfigHelper_getLanguage } from "./ConfigHelper";
import { AppContext } from "../types/types";
import utc from "dayjs/plugin/utc";
import calendar from "dayjs/plugin/calendar";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/es";

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

export async function DateHelper_formNow(context: AppContext, date: string, dateTemplate?: {}): Promise<string> {
    const dateSettings = await ConfigHelper_getDateFormatConfig(context);
    const destinationLanguage = await ConfigHelper_getLanguage(context);
    importDayJs(destinationLanguage);
    const timeZone = dateSettings ? dateSettings.timeZone : "Europe/London";
    let dateJsObj = dayjs(date).tz(timeZone);
    if (dateTemplate) {
        dateJsObj.locale(destinationLanguage, dateTemplate);
    }

    return dateJsObj.fromNow();
}
