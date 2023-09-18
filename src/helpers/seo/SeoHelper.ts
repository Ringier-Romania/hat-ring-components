import {
    ConfigHelper_getLanguage,
    ConfigHelper_getSeoOpenGraphConfig,
    ConfigHelper_getSiteContactNumber, ConfigHelper_getSiteLogo,
    ConfigHelper_getSiteName, SeoTitlesAndDescription
} from "../ConfigHelper";
import {ImageHelper_getDefaultImageData, ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {OpenGraphHelper_getMainStoryImageData} from "./OpenGraphHelper";
import {SeoTitleHelper_pageTitle} from "./SeoTitleHelper";
import {SeoDescriptionHelper_pageDescription} from "./SeoDescriptionHelper";
import {UtilsHelper_getCurrentNodeName, UtilsHelper_getCurrentPageType} from "../UtilsHelper";

export async function SeoHelper_currentTitle(context, place: string) {
    return await SeoTitleHelper_pageTitle(context, place);
}

export async function SeoHelper_currentDescription(context, place: string) {
    return await SeoDescriptionHelper_pageDescription(context, place);
}

export async function SeoHelper_getServiceName(context) {
    //add field ServiceName in General config?
    return await SeoTitleHelper_pageTitle(context, 'default');
}

export async function SeoHelper_getServiceDescription(context) {
    //add field ServiceDescription in General config?
    return await SeoDescriptionHelper_pageDescription(context, 'default');
}

export async function SeoHelper_getServiceLogo(context) {
    return await ConfigHelper_getSiteLogo(context);
}

export async function SeoHelper_getContactNumber(context) {
    return await ConfigHelper_getSiteContactNumber(context);
}

export function SeoHelper_currentType(context) {
    if (context) {
        switch (context.siteContentType) {
            case "SiteNode":
                return "website";
            case "Story":
                return "article";
            default:
                return "";
        }
    }

    return "";
}

export async function SeoHelper_currentSiteName(context) {
    return ConfigHelper_getSiteName(context);
}

export async function SeoHelper_currentLocale(context) {
    return ConfigHelper_getLanguage(context);
}

export async function SeoHelper_currentDefaultImageData(context) {
    const seoOpenGraphSettings = await ConfigHelper_getSeoOpenGraphConfig(context);

    if (seoOpenGraphSettings) {
        const configImageSizes = ImageHelper_getImageDimensionsFromObject(seoOpenGraphSettings, context, 'imageSizesDesktop', 'imageSizesMobile', '0x0');

        return configImageSizes ? ImageHelper_getDefaultImageData(context, configImageSizes.width, configImageSizes.height) : null;
    }

    return null;
}

export async function SeoHelper_currentMainStoryImageData(context) {
    return OpenGraphHelper_getMainStoryImageData(context);
}

// to delete
/**
 * Transform the current text to the SEO requirements (separators support)
 * TODO: Add support for the separator character (|) or add support for title translation/transformation
 * @param {string} textA > Text to transform (add separator AFTER text output)
 * @param {string} textB > Text to transform (add separator BEFORE text output)
 * @constructor
 */
export function SeoHelper_addTextSeparator(textA: string, textB: string) {
    const separator = ' | ';

    if (textA && textA !== '' && textB && textB !== '') {
        return `${textA}${separator}${textB}`;
    }

    return `${textA}${textB}`;
}

export async function SeoHelper_replaceBracketVariables(context, source: SeoTitlesAndDescription) {

    let replacedValues = source;

    for (const [key, value] of Object.entries(source)) {
        let phrase: string = value;

        if (phrase.includes('{{serviceName}}')) {
            phrase = phrase.replaceAll(/{{serviceName}}/gm, await SeoHelper_getServiceName(context) || '');
        }

        if (phrase.includes('{{nodeName}}')) {
            phrase = phrase.replaceAll(/{{nodeName}}/gm,UtilsHelper_getCurrentNodeName(context) || '');
        }

        if (phrase.includes('{{number}}')) {
            phrase = phrase.replace(/{{number}}/gm,'');
            //controllerparams
        }

        if (phrase.includes('{{pageTypeName}}')) {
            phrase = phrase.replace(/{{pageTypeName}}/gm, UtilsHelper_getCurrentPageType(context) || '');
        }

        if (phrase.includes('{{topic}}')) {
            phrase = phrase.replace(/{{topic}}/gm,'');
        }

        if (phrase.includes('{{topicName}}')) {
            phrase = phrase.replace(/{{topicName}}/gm,'');
        }

        if (phrase.includes('{{serviceDescription}}')) {
            phrase = phrase.replace(/{{serviceDescription}}/gm, await SeoHelper_getServiceDescription(context) || '');
        }

        replacedValues[key] = phrase;
    }

    return replacedValues;
}