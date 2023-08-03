import {ConfigHelper_getLanguage, ConfigHelper_getSeoOpenGraphConfig, ConfigHelper_getSiteName} from "../ConfigHelper";
import {ImageHelper_getDefaultImageData, ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {OpenGraphHelper_getMainStoryImageData} from "./OpenGraphHelper";
import {SeoTitleHelper_pageTitle} from "./SeoTitleHelper";
import {SeoDescriptionHelper_pageDescription} from "./SeoDescriptionHelper";

export async function SeoHelper_currentTitle(context, place: string) {
    return await SeoTitleHelper_pageTitle(context, place);
}

export async function SeoHelper_currentDescription(context, place: string) {
    return await SeoDescriptionHelper_pageDescription(context, place);
}

export async function SeoHelper_getServiceName(context) {
    return await SeoTitleHelper_pageTitle(context, 'default');
}

export function SeoHelper_getServiceDescription() {
    return "Looking for a partner for your digital transformation? Ring Publishing - an all-in-one digital publishing solution, with over 20 years of experience, helping media brands succeed in the digital era"
}

export function SeoHelper_getServiceLogo() {
    return ""
}

export function SeoHelper_getContactNumber() {
    return ""

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
