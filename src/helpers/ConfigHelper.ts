import {UtilsHelper_getDomain, UtilsHelper_isDevelopmentMode} from "./UtilsHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../providers/WebsiteApiProvider";
import _ from "lodash";
import {CacheHelper_get, CacheHelper_runCallbackIfTimeStampHasExpired, CacheHelper_set} from "./CacheHelper";
import {AppContext} from "../types/types";

export async function ConfigHelper_getConfig(context: AppContext, configKey) {
    const variant = context.websiteManagerVariant;
    const variables = {
        nodeID: context.siteNodeId,
        variant: variant,
    };

    const query = gql`
        query($nodeID: ID!, $variant:ID!){
            node(id: $nodeID){
                config(variantId: $variant){
                    config(codeName: "${configKey}"){
                        data
                    }
                }
            }
        }
    `;

    const response = await WebsiteApiProvider.call(query, variables);
    const sectionsConfig = _.get(response, 'data.node.config.config.0.data');

    return sectionsConfig;
}

export async function ConfigHelper_getGeneralConfig(context) :Promise<{
    language: string,
    siteName: string,
    siteDescription: string,
    siteContactNumber: string,
    siteLogo: string,
    homepageUrl: string,
    homepageURL: string,
    defaultImage: string,
}> {
    return ConfigHelper_getConfig(context, 'general');
}

export async function ConfigHelper_getSeoGeneralConfig(context) :Promise<{
    defaultArticleAuthor: string,
    defaultArticleAuthorEmail: string,
}> {
    return ConfigHelper_getConfig(context, 'seoSettings');
}

export async function ConfigHelper_getSeoLanguagesConfig(context) {
    return ConfigHelper_getConfig(context, 'seoLanguages');
}

export async function ConfigHelper_getSeoRssDefaultConfig(context): Promise<{
    rssType: string,
    limit: number,
}> {
    return ConfigHelper_getConfig(context, 'rssDefault');
}

export interface SeoTitlesAndDescription {
    homePageTitle: string,
    homePageDescription: string,
    listPageTitle: string,
    listPageDescription: string,
    listPageTitleWithNumeration: string,
    listPageDescriptionWithNumeration: string,
    topicPageTitle: string,
    topicPageDescription: string,
    topicPageTitleWithNumeration: string,
    topicPageDescriptionWithNumeration: string,
    otherPageTitle: string,
    otherPageDescription: string,
    detailPageTitle: string,
    detailPageDescription: string
}

export async function ConfigHelper_getSeoTitlesAndDescriptionConfig(context) :Promise<SeoTitlesAndDescription> {
    return ConfigHelper_getConfig(context, 'seoTitlesAndDescription');
}

export async function ConfigHelper_getMetaDataConfig(context): Promise<{
    customMetaTags: Array<any>,
}> {
    return ConfigHelper_getConfig(context, 'metaData');
}

export async function ConfigHelper_getDeveloperSettingsConfig(context): Promise<{
    globalCustomTeasers: Array<{
        'Widget type'?: string,
        'For big image'?: 'on',
        'For mobile'?: 'on',
        'Teaser code name'?: string
    }>,
    textReplacers: Array<{
        'Match pattern'?: string,
        'Replacement'?: string,
    }>,
    mainCategoryUuid: string,
}> {
    return ConfigHelper_getConfig(context, 'devGeneral');
}

export async function ConfigHelper_getLanguage(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.language : 'en';
}

export async function ConfigHelper_getDateFormatConfig(context) {
    return ConfigHelper_getConfig(context, 'dateFormat') as Promise<{
        timeZone: string,
        useExtendedDatesFormat: false,
        sameDay: string,
        lastDay: string,
        nextDay: string,
        lastWeek: string,
        nextWeek: string,
        sameElse: string
    }>;
}

export async function ConfigHelper_getSiteName(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.siteName : '';
}

export async function ConfigHelper_getSiteDescription(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.siteDescription : '';
}

export async function ConfigHelper_getSiteContactNumber(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.siteContactNumber : '';
}

export async function ConfigHelper_getSiteLogo(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.siteLogo : '';
}

export async function ConfigHelper_getSeoOpenGraphConfig(context) {
    return ConfigHelper_getConfig(context, 'seoOpenGraph');
}

export async function ConfigHelper_getHomepageUrl(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);

    // TODO: Check why there is difference between key names: homepageUrl | homepageURL
    if (generalSettings && generalSettings.homepageURL) {
        return generalSettings.homepageURL || '';
    }

    return generalSettings ? generalSettings.homepageUrl : '';
}

export async function ConfigHelper_currentUrl(context) {
    return  `${UtilsHelper_getDomain()}${context.url}`;
}

export async function ConfigHelper_getMainCategoryUuid(context) {
    const developerSettings = await ConfigHelper_getDeveloperSettingsConfig(context);
    return developerSettings ? developerSettings.mainCategoryUuid : '';
}
