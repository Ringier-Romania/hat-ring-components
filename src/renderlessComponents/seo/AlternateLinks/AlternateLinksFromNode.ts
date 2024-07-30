// Libraries
import _ from "lodash";

//Types
import {AppContext} from "@hatTypes/types";
import {UtilsHelper_getDomain} from "@hatRingHelpers/UtilsHelper";
import {ConfigHelper_getLanguage} from "@hatRingHelpers/ConfigHelper";
import { AlternateLinksObject } from "./AlternateLinks";
/**
 * Fill alternate links via custom links from the node/page configuration
 * @param context
 * @param seoConfig
 * @param alternateLinks
 * @constructor
 */

export async function AlternateLinksFromNode(context: AppContext, seoConfig: object, alternateLinks: Array<AlternateLinksObject> = []) {
    const customAlternatives = (_.get(seoConfig, 'customAlternatives', []) || []);
    const customAlternativesLength = customAlternatives.length;
    const curentLanguage = await ConfigHelper_getLanguage(context) || 'en';
    let xDefault: string | null = null;
    alternateLinks = [];

    for (let i = 0; i < customAlternativesLength; i++) {
        alternateLinks.push({hrefLang: customAlternatives[i]['Language code'], href: UtilsHelper_getDomain() + customAlternatives[i]['Alternative href']})

        if (customAlternatives[i]['Default language'] === 'on') {
            xDefault = UtilsHelper_getDomain() + customAlternatives[i]['Alternative href'];
        }
    }

    if (xDefault) {
        alternateLinks.push({hrefLang: 'x-default', href: xDefault});
    }

    if (!alternateLinks.find((link) => link.hrefLang === curentLanguage)) {
        alternateLinks.push({hrefLang: curentLanguage, href: UtilsHelper_getDomain() + context.url});
    }

    return alternateLinks;
}
