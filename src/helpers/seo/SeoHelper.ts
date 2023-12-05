import {
    ConfigHelper_getLanguage,
    ConfigHelper_getSeoOpenGraphConfig, ConfigHelper_getSeoTitlesAndDescriptionConfig,
    ConfigHelper_getSiteContactNumber, ConfigHelper_getSiteDescription, ConfigHelper_getSiteLogo,
    ConfigHelper_getSiteName, SeoTitlesAndDescription
} from "../ConfigHelper";
import {ImageHelper_getDefaultImageData, ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {OpenGraphHelper_getMainStoryImageData} from "./OpenGraphHelper";
import {SeoTitleHelper_pageTitle} from "./SeoTitleHelper";
import {SeoDescriptionHelper_pageDescription} from "./SeoDescriptionHelper";
import {UtilsHelper_asyncSequentialForEach, UtilsHelper_getCurrentNodeName, UtilsHelper_getCurrentPageType} from "../UtilsHelper";
import get from "lodash/get";

export async function SeoHelper_currentTitle(context, place: string) {
    const seoTitlesSettings = await ConfigHelper_getSeoTitlesAndDescriptionConfig(context);
    const pageType = UtilsHelper_getCurrentPageType(context);
    let pattern= null;

    switch (pageType) {
        case 'Story':
            pattern = get(seoTitlesSettings, 'detailPageTitle');
            break;

        case 'SiteNode':
            pattern = get(seoTitlesSettings, 'listPageTitle');
            break;

        case 'Homepage':
            pattern = get(seoTitlesSettings, 'homePageTitle');
            break;

        case 'Topic':
            pattern = get(seoTitlesSettings, 'topicPageTitle');
            break;

        default:
            pattern = get(seoTitlesSettings, 'otherPageTitle');
            break;
    }

    if (pattern) {
        const mapToReplace = await mapPatternVariables(context, place, pattern);
        return await SeoHelper_replaceBracketVariables(mapToReplace, pattern);
    }

    return await SeoTitleHelper_pageTitle(context, place);
}

export async function SeoHelper_currentDescription(context, place: string) {
    const seoDescriptionSettings = await ConfigHelper_getSeoTitlesAndDescriptionConfig(context);
    const pageType = UtilsHelper_getCurrentPageType(context);
    let pattern= null;

    switch (pageType) {
        case 'Story':
            pattern = get(seoDescriptionSettings, 'detailPageDescription');
            break;

        case 'SiteNode':
            pattern = get(seoDescriptionSettings, 'listPageDescription');
            break;

        case 'Homepage':
            pattern = get(seoDescriptionSettings, 'homePageDescription');
            break;

        case 'Topic':
            pattern = get(seoDescriptionSettings, 'topicPageDescription');
            break;

        default:
            pattern = get(seoDescriptionSettings, 'otherPageDescription');
            break;
    }

    if (pattern) {
        const mapToReplace = await mapPatternVariables(context, place, pattern);
        return await SeoHelper_replaceBracketVariables(mapToReplace, pattern);
    }

    return await SeoDescriptionHelper_pageDescription(context, place);
}

export async function SeoHelper_getServiceLogo(context) {
    return await ConfigHelper_getSiteLogo(context);
}

export async function SeoHelper_getContactNumber(context) {
    return await ConfigHelper_getSiteContactNumber(context);
}

export async function SeoHelper_currentSiteName(context) {
    return ConfigHelper_getSiteName(context);
}

export async function SeoHelper_currentLocale(context) {
    return ConfigHelper_getLanguage(context);
}

export async function SeoHelper_currentMainStoryImageData(context) {
    return OpenGraphHelper_getMainStoryImageData(context);
}

export async function SeoHelper_currentDefaultImageData(context) {
    const seoOpenGraphSettings = await ConfigHelper_getSeoOpenGraphConfig(context);

    if (seoOpenGraphSettings) {
        const configImageSizes = ImageHelper_getImageDimensionsFromObject(seoOpenGraphSettings, context, 'imageSizesDesktop', 'imageSizesMobile', '0x0');

        return configImageSizes ? ImageHelper_getDefaultImageData(context, configImageSizes.width, configImageSizes.height) : null;
    }

    return null;
}

async function mapPatternVariables(context, place: string, fieldToCheck: string = '') {
    if (!fieldToCheck || fieldToCheck === '') {
        return {};
    }

    let dynamicPatternMap = {};

    if (fieldToCheck.includes('{{siteName}}')) {
        dynamicPatternMap['{{siteName}}'] = async () => {
            return await SeoHelper_currentSiteName(context);
        };
    }

    if (fieldToCheck.includes('{{siteDescription}}')) {
        dynamicPatternMap['{{siteDescription}}'] = async () => {
            return await ConfigHelper_getSiteDescription(context);
        };
    }

    if (fieldToCheck.includes('{{currentTitle}}')) {
        dynamicPatternMap['{{currentTitle}}'] = async() => {return await SeoTitleHelper_pageTitle(context, place)};
    }

    if (fieldToCheck.includes('{{currentDescription}}')) {
        dynamicPatternMap['{{currentDescription}}'] = async() => {return await SeoDescriptionHelper_pageDescription(context, place)};
    }

    if (fieldToCheck.includes('{{nodeName}}')) {
        dynamicPatternMap['{{nodeName}}'] = () => {return UtilsHelper_getCurrentNodeName(context)};
    }

    if (fieldToCheck.includes('{{pageTypeName}}')) {
        dynamicPatternMap['{{pageTypeName}}'] = () => {return UtilsHelper_getCurrentPageType(context)};
    }

    if (fieldToCheck.includes('{{number}}')) {
        dynamicPatternMap['{{number}}'] = 'number'; //TODO: Add support for page numbers
    }

    return dynamicPatternMap;
}

export async function SeoHelper_replaceBracketVariables(mapToReplace, homePattern: string) {
    let replacedText = homePattern;

    await UtilsHelper_asyncSequentialForEach(Object.keys(mapToReplace), async (key) => {
        replacedText = replacedText.replaceAll(`${key}`, await mapToReplace[key]());
    });

    return replacedText;
}
