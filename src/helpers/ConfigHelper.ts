import {UtilsHelper_convertToInt, UtilsHelper_getDomain, UtilsHelper_isDevelopmentMode} from "./UtilsHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../providers/WebsiteApiProvider";
import _ from "lodash";
import {AppContext} from "../types/types";
import {MonitoringProvider} from "../providers/MonitoringProvider";

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

    if (process.env.MEM_CACHE_FOR_CONFIG_MODE && process.env.MEM_CACHE_FOR_CONFIG_MODE !== 'none') {
        const cacheKey = {query: query.loc?.source.body, variables};
        const cacheKeyString = JSON.stringify(cacheKey);
        context.customData._cache = context.customData._cache || {};
        let cachedElement = context.customData._cache;

        if (process.env.MEM_CACHE_FOR_CONFIG_MODE === 'request') {
            if (!cachedElement[cacheKeyString]) {
                const response = await WebsiteApiProvider.call(query, variables, process.env.CACHE_TTL_CONFIG ? UtilsHelper_convertToInt(process.env.CACHE_TTL_CONFIG) : 1);
                cachedElement[cacheKeyString] = response;
                MonitoringProvider.counter('info.ConfigHelper_getConfig.cached');
                return _.get(response, 'data.node.config.config.0.data');
            }
            MonitoringProvider.counter('info.ConfigHelper_getConfig.nonCached');
            return _.get(cachedElement[cacheKeyString], 'data.node.config.config.0.data');
        } else {
            global._cache = global._cache || {};
            if (!cachedElement[cacheKeyString] || !global._cacheTimeStamp[cacheKeyString] || (new Date().getTime() - global._cacheTimeStamp[cacheKeyString]) > (UtilsHelper_convertToInt(process.env.MEM_CACHE_FOR_CONFIG_TTL_MS || 1000))) {
                const response = await WebsiteApiProvider.call(query, variables, process.env.CACHE_TTL_CONFIG ? UtilsHelper_convertToInt(process.env.CACHE_TTL_CONFIG) : 1);
                cachedElement[cacheKeyString] = response;
                global._cacheTimeStamp = global._cacheTimeStamp || {};
                global._cacheTimeStamp[cacheKeyString] = new Date().getTime();
                MonitoringProvider.counter('info.ConfigHelper_getConfig.cached');
                return _.get(response, 'data.node.config.config.0.data');
            }
            MonitoringProvider.counter('info.ConfigHelper_getConfig.nonCached');
            return _.get(cachedElement[cacheKeyString], 'data.node.config.config.0.data');
        }
    } else {
        const response = await WebsiteApiProvider.call(query, variables, process.env.CACHE_TTL_CONFIG ? UtilsHelper_convertToInt(process.env.CACHE_TTL_CONFIG) : 1);
        const sectionsConfig = _.get(response, 'data.node.config.config.0.data');

        return sectionsConfig;
    }
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
    homepageNodeIds: string,
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
    searchPageTitle: string,
    searchPageDescription: string,
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
    displayTitleCodeName?: string
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

export async function getDeveloperSettingDetail(context): Promise <{
    linksReplace: Array<{
        'text': string,
        'role': string,
        'replace': string,
        'children'?: Array<{}>
    }>
}> {
    return ConfigHelper_getConfig(context, 'devDetail');
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
