// Libraries
import _ from 'lodash';
import {AppContext, SiteContentType} from "../types/types";

export function UtilsHelper_convertToInt(input: string | number) {
    return typeof input === "number" ? input : parseInt(input);
}

export function UtilsHelper_getValueIfExists(value, defaultValue) {
    return _.isNil(value) ? defaultValue : value;
}

export function UtilsHelper_isDevelopmentMode() {
    return process.env.NODE_ENV !== 'production';
}

export function UtilsHelper_isMobile(context) {
    return !!context.hatControllerParams?.isMobile;
}

export function UtilsHelper_getExtension(src: string): string | null {
    const ext = src.split('.').pop();
    return ext ? ext.toLowerCase() : null;
}

export async function UtilsHelper_asyncSequentialForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export async function UtilsHelper_asyncParallelForEach(arr, callback){
    return await Promise.allSettled(arr.map(callback));
}

export function UtilsHelper_isHomepage(context) {
    return context.url === '/';
}

export function UtilsHelper_getCurrentPageType(context) {
    const isHomePage = UtilsHelper_isHomepage(context);
    return isHomePage ? 'Homepage' : (context.siteContentType || null);
}

export function UtilsHelper_getCurrentNodeName(context) {
    try {
        const content = context?.hatControllerParams?.gqlResponse?.data?.site?.data?.content;
        if (content) {
            const pageType = UtilsHelper_getCurrentPageType(context);

            if (pageType === SiteContentType.SiteNode) {
                // @TODO: getting name for sitenode/category in HAT Server?
                const slug = content.slug?.replaceAll('-', ' ') || '';
                return (slug.charAt(0).toUpperCase() + slug.slice(1)) || '';
            } else if (pageType === SiteContentType.Story) {
                return content.title || '';
            } else if (pageType === SiteContentType.CustomAction) {
                return content.action || '';
            } else if ([SiteContentType.Source, SiteContentType.Topic].includes(pageType)) {
                return content.name || '';
            } else if (pageType === SiteContentType.Author) {
                // @TODO: get author name in HAT Server
                return '';
            }
        }
    } catch (e) {
        console.error('Error when getting current node name', e);
    }

    return '';
}

export function UtilsHelper_ensureHttps(url: string): string {
    return url.replace('http://', 'https://');
}

export function UtilsHelper_getDomain(){
    return process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
}

export function UtilsHelper_getCurrentNodeCategoryId(context: AppContext){
    return _.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id', null);
}
