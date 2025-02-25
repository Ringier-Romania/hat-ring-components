import dayjs from "dayjs";
import { ConfigHelper_getDateFormatConfig, ConfigHelper_getLanguage } from "./ConfigHelper";
import { AppContext } from "../types/types";
import utc from "dayjs/plugin/utc";
import calendar from "dayjs/plugin/calendar";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/de";
import "dayjs/locale/fr";
import "dayjs/locale/es";

export async function DateHelper_convertDate(
    context: AppContext,
    date: string,
    format = null as string | null,
    fromNow = false
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
    if (fromNow) {
        dayjs.extend(relativeTime);
        dayjs.extend(updateLocale);
        if (destinationLanguage === "de") {
            dayjs.updateLocale("de", {
                relativeTime: {
                    future: "in %s",
                    past: "%s",
                    s: "Aktualisiert vor einigen Sekunden",
                    m: "Aktualisiert vor 1 Minute",
                    mm: "Aktualisiert vor %d Minuten",
                    h: "Aktualisiert vor 1 Stunde",
                    hh: "Aktualisiert vor %d Stunden",
                    d: "Aktualisiert vor 1 Tag",
                    dd: "Aktualisiert vor %d Tagen",
                    M: "Aktualisiert vor 1 Monat",
                    MM: "Aktualisiert vor %d Monaten",
                    y: "Aktualisiert vor 1 Jahr",
                    yy: "Aktualisiert vor %d Jahren",
                },
            });
        }
        return dateJsObj.fromNow();
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
