import {ConfigHelper_getConfig, ConfigHelper_getLanguage} from "../helpers/ConfigHelper";
import {AppContext} from "../types/types";
import _ from "lodash";

export class TranslationProvider {
    static async translate(context: AppContext, source: any) {
        const translationMap = _.get(await ConfigHelper_getConfig(context, 'translations'), 'translationMap', []);
        const language = await ConfigHelper_getLanguage(context);
        const translation = translationMap.find((item: any) => item.language === language && item.source === source);
        return translation ? translation.translation : source;
    }
}
