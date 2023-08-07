import React from "react";
import isNil from 'lodash/isNil';

export function UtilsHelper_convertToInt(input: string | number) {
    return typeof input === "number" ? input : parseInt(input);
}

export function UtilsHelper_getValueIfExists(value, defaultValue) {
    return isNil(value) ? defaultValue : value;
}

export function UtilsHelper_isDevelopmentMode() {
    return process.env.NODE_ENV === 'development';
}

export function UtilsHelper_isMobile(context) {
    return !!context.hatControllerParams?.isMobile;
}

export function UtilsHelper_getExtension(src: string): string | null {
    const ext = src.split('.').pop();
    return ext ? ext.toLowerCase() : null;
}

export async function UtilsHelper_asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export function UtilsHelper_isHomepage(context) {
    return context.url === '/';
}

export function UtilsHelper_getCurrentPageType(context) {
    const isHomePage = UtilsHelper_isHomepage(context);
    return isHomePage ? 'Homepage' : (context.siteContentType || null);
}

export function UtilsHelper_ensureHttps(url: string): string {
    return url.replace('http://', 'https://');
}
