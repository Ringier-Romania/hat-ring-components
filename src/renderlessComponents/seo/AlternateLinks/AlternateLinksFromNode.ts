// Libraries
import get from "lodash/get";

//Types
import {AppContext} from "../../../types/types";
import {UtilsHelper_getDomain} from "../../../helpers/UtilsHelper";

/**
 * Fill alternate links via custom links from the node/page configuration
 * @param context
 * @param seoConfig
 * @param alternateLinks
 * @constructor
 */
export async function AlternateLinksFromNode(context: AppContext, seoConfig: object, alternateLinks: object = {}) {
    const customAlternatives = (get(seoConfig, 'customAlternatives', []) || []);
    const customAlternativesLength = customAlternatives.length;
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

    return alternateLinks;
}
