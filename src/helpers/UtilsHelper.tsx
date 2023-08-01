import React from "react";
import isNil from 'lodash/isNil';
import {ConfigHelper_getHomepageUrl} from "./ConfigHelper";

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
    const ext = src.split('.').pop()
    return ext ? ext.toLowerCase() : null;
}

export async function UtilsHelper_asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export async function UtilsHelper_currentUrl(context) {
    const fullHomepageUrl = await ConfigHelper_getHomepageUrl(context);
    return fullHomepageUrl ? `${fullHomepageUrl}${context.url}` : `${context.url}`;
}

export function UtilsHelper_ensureHttps(url: string): string {
    return url.replace('http://', 'https://');
}
