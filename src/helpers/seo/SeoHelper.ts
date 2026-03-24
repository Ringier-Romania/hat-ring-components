import {
    ConfigHelper_getGeneralConfig,
    ConfigHelper_getLanguage, ConfigHelper_getSeoGeneralConfig,
    ConfigHelper_getSeoOpenGraphConfig,
    ConfigHelper_getSeoTitlesAndDescriptionConfig,
    ConfigHelper_getSiteContactNumber,
    ConfigHelper_getSiteDescription,
    ConfigHelper_getSiteLogo,
    ConfigHelper_getSiteName
} from "../ConfigHelper";
import {ImageHelper_getDefaultImageData, ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {OpenGraphHelper_getMainStoryImageData} from "./OpenGraphHelper";
import {SeoTitleHelper_pageTitle} from "./SeoTitleHelper";
import {SeoDescriptionHelper_pageDescription} from "./SeoDescriptionHelper";
import {
    UtilsHelper_asyncSequentialForEach,
    UtilsHelper_stripHtmlTags,
    UtilsHelper_getCurrentNodeName,
    UtilsHelper_getQueryParam,
    UtilsHelper_getSearchQueryParamKey,
    UtilsHelper_isHomepage, UtilsHelper_parsePositiveIntFromString
} from "../UtilsHelper";
import _ from "lodash";
import {SiteContentType} from "../../types/types";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";

export async function SeoHelper_currentTitle(context, place: string) {
    const seoTitlesSettings = await ConfigHelper_getSeoTitlesAndDescriptionConfig(context);
    const pageType = await SeoHelper_getSeoCurrentPageType(context);
    const withNumeration = !!UtilsHelper_getQueryParam('page', context);
    let pattern= null;

    switch (pageType) {
        case SiteContentType.Story:
            pattern = _.get(seoTitlesSettings, 'detailPageTitle');
            break;

        case SiteContentType.SiteNode:
            pattern = withNumeration ? _.get(seoTitlesSettings, 'listPageTitleWithNumeration') : _.get(seoTitlesSettings, 'listPageTitle');
            break;

        case SiteContentType.Homepage:
            pattern = _.get(seoTitlesSettings, 'homePageTitle');
            break;

        case SiteContentType.Topic:
            pattern = withNumeration ? _.get(seoTitlesSettings, 'topicPageTitleWithNumeration') : _.get(seoTitlesSettings, 'topicPageTitle');
            break;

        case SiteContentType.Author:
            pattern = _.get(seoTitlesSettings, 'authorPageTitle');
            break;

        case SiteContentType.Search:
            pattern = _.get(seoTitlesSettings, 'searchPageTitle');
            break;

        default:
            pattern = _.get(seoTitlesSettings, 'otherPageTitle');
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
    const pageType = await SeoHelper_getSeoCurrentPageType(context);
    const withNumeration = !!UtilsHelper_getQueryParam('page', context);
    let pattern= null;

    switch (pageType) {
        case SiteContentType.Story:
            pattern = _.get(seoDescriptionSettings, 'detailPageDescription');
            break;

        case SiteContentType.SiteNode:
            pattern = withNumeration ? _.get(seoDescriptionSettings, 'listPageDescriptionWithNumeration') : _.get(seoDescriptionSettings, 'listPageDescription');
            break;

        case SiteContentType.Homepage:
            pattern = _.get(seoDescriptionSettings, 'homePageDescription');
            break;

        case SiteContentType.Topic:
            pattern = withNumeration ? _.get(seoDescriptionSettings, 'topicPageDescriptionWithNumeration') : _.get(seoDescriptionSettings, 'topicPageDescription');
            break;

        case SiteContentType.Author:
            pattern = _.get(seoDescriptionSettings, 'authorPageDescription');
            break;

        case SiteContentType.Search:
            pattern = _.get(seoDescriptionSettings, 'searchPageDescription');
            break;

        default:
            pattern = _.get(seoDescriptionSettings, 'otherPageDescription');
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

export async function SeoHelper_isSeoHomepage(context) {
    const seoGeneralConfig = await ConfigHelper_getSeoGeneralConfig(context);
    const homepageNodeIds = _.get(seoGeneralConfig, 'homepageNodeIds', '');
    if (homepageNodeIds !== '') {
        const nodeIds = homepageNodeIds.split(',').map(id => id.trim());
        if (nodeIds.includes(context.id)) {
            return true;
        }
    }
    return UtilsHelper_isHomepage(context);
}

export async function SeoHelper_getSeoCurrentPageType(context) {
    const isHomePage = await SeoHelper_isSeoHomepage(context);
    return isHomePage ? SiteContentType.Homepage : (context.siteContentType || null);
}


export async function SeoHelper_authorName(context) {
    const authorNameFromContext = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.name', '');
    if (authorNameFromContext) return authorNameFromContext;

    const query = gql`
        query($uuid: UUID){
            author(id:$uuid){
                name
            }
        }
    `;
    const variables = {
        uuid: context.id,
    };

    const response = await WebsiteApiProvider.call(query, variables);
    return _.get(response, 'data.author.name', '');
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
        dynamicPatternMap['{{pageTypeName}}'] = async() => {return await SeoHelper_getSeoCurrentPageType(context)};
    }

    if (fieldToCheck.includes('{{number}}')) {
        dynamicPatternMap['{{number}}'] = () => {return UtilsHelper_parsePositiveIntFromString(UtilsHelper_getQueryParam('page', context)) || 1}
    }

    if (fieldToCheck.includes('{{searchPhrase}}')) {
        const searchPhrase = UtilsHelper_getQueryParam(UtilsHelper_getSearchQueryParamKey(), context)
        dynamicPatternMap['{{searchPhrase}}'] = () => {return UtilsHelper_stripHtmlTags(searchPhrase || '')}
    }

    if (fieldToCheck.includes('{{authorName}}')) {
        dynamicPatternMap['{{authorName}}'] = async() => {return await SeoHelper_authorName(context)};
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
