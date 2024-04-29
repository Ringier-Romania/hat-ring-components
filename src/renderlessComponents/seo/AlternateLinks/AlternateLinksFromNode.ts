// Libraries
import _ from "lodash";

//Types
import {AppContext} from "../../../types/types";
import {UtilsHelper_getDomain} from "../../../helpers/UtilsHelper";
import {ConfigHelper_getLanguage} from "../../../helpers/ConfigHelper";

/**
 * Fill alternate links via custom links from the node/page configuration
 * @param context
 * @param seoConfig
 * @param alternateLinks
 * @constructor
 */
export async function AlternateLinksFromNode(context: AppContext, seoConfig: object, alternateLinks: object = {}) {
    const customAlternatives = (_.get(seoConfig, 'customAlternatives', []) || []);
    const customAlternativesLength = customAlternatives.length;
    const curentLanguage = await ConfigHelper_getLanguage(context) || 'en';
    let xDefault: string | null = null;
    alternateLinks = {languages: {}};

    for (let i = 0; i < customAlternativesLength; i++) {
        alternateLinks["languages"][`${customAlternatives[i]['Language code']}`] = UtilsHelper_getDomain() + customAlternatives[i]['Alternative href'];

        if (customAlternatives[i]['Default language'] === 'on') {
            xDefault = UtilsHelper_getDomain() + customAlternatives[i]['Alternative href'];
        }
    }

    if (xDefault) {
        alternateLinks["languages"]['x-default'] = xDefault;
    }

    if(!alternateLinks["languages"][curentLanguage]) {
        alternateLinks["languages"][curentLanguage] = UtilsHelper_getDomain() + context.url;
    }

    return alternateLinks;
}
