"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsHelper_getCurrentUrl = UtilsHelper_getCurrentUrl;
exports.UtilsHelper_convertToInt = UtilsHelper_convertToInt;
exports.UtilsHelper_parsePositiveIntFromString = UtilsHelper_parsePositiveIntFromString;
exports.UtilsHelper_getValueIfExists = UtilsHelper_getValueIfExists;
exports.UtilsHelper_isDevelopmentMode = UtilsHelper_isDevelopmentMode;
exports.UtilsHelper_isMobile = UtilsHelper_isMobile;
exports.UtilsHelper_getExtension = UtilsHelper_getExtension;
exports.UtilsHelper_asyncSequentialForEach = UtilsHelper_asyncSequentialForEach;
exports.UtilsHelper_asyncParallelForEach = UtilsHelper_asyncParallelForEach;
exports.UtilsHelper_isHomepage = UtilsHelper_isHomepage;
exports.UtilsHelper_getCurrentPageType = UtilsHelper_getCurrentPageType;
exports.UtilsHelper_getCurrentNodeName = UtilsHelper_getCurrentNodeName;
exports.UtilsHelper_ensureHttps = UtilsHelper_ensureHttps;
exports.UtilsHelper_getDomain = UtilsHelper_getDomain;
exports.UtilsHelper_getCurrentUrlWithDomain = UtilsHelper_getCurrentUrlWithDomain;
exports.UtilsHelper_getCurrentNodeCategoryId = UtilsHelper_getCurrentNodeCategoryId;
exports.UtilsHelper_generateRandomString = UtilsHelper_generateRandomString;
exports.UtilsHelper_getQueryParam = UtilsHelper_getQueryParam;
exports.UtilsHelper_getSearchQueryParamKey = UtilsHelper_getSearchQueryParamKey;
exports.UtilsHelper_stripHtmlTags = UtilsHelper_stripHtmlTags;
exports.UtilsHelper_slugify = UtilsHelper_slugify;
exports.UtilsHelper_getErrorMessage = UtilsHelper_getErrorMessage;
const lodash_1 = __importDefault(require("lodash"));
const types_1 = require("../types/types");
function UtilsHelper_getCurrentUrl(context) {
    const forwardedProto = context.request.headers.get('x-forwarded-proto') || context.url.protocol.replace(':', '');
    const forwardedHost = context.request.headers.get('x-forwarded-host') || context.url.host;
    const forwardedUri = context.request.headers.get('x-forwarded-uri') || context.url.pathname;
    return `${forwardedProto}://${forwardedHost}${forwardedUri}`;
}
function UtilsHelper_convertToInt(input) {
    return input ? typeof input === "number" ? input : parseInt(input) : 0;
}
function UtilsHelper_parsePositiveIntFromString(input) {
    if (typeof input === "number") {
        return Number.isInteger(input) && input > 0 ? input : 0;
    }
    if (typeof input === "string") {
        return (/^[1-9]\d*$/.test(input)) ? parseInt(input, 10) : 0;
    }
}
function UtilsHelper_getValueIfExists(value, defaultValue) {
    return lodash_1.default.isNil(value) ? defaultValue : value;
}
function UtilsHelper_isDevelopmentMode() {
    return process.env.NODE_ENV !== 'production';
}
function UtilsHelper_isMobile(context) {
    var _a;
    return !!((_a = context.hatControllerParams) === null || _a === void 0 ? void 0 : _a.isMobile);
}
function UtilsHelper_getExtension(src) {
    const ext = src ? src.split('.').pop() : null;
    return ext ? ext.toLowerCase() : null;
}
async function UtilsHelper_asyncSequentialForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
async function UtilsHelper_asyncParallelForEach(arr, callback) {
    return await Promise.all(arr.map(callback));
}
function UtilsHelper_isHomepage(context) {
    return context.url === '/';
}
function UtilsHelper_getCurrentPageType(context) {
    const isHomePage = UtilsHelper_isHomepage(context);
    return isHomePage ? types_1.SiteContentType.Homepage : (context.siteContentType || null);
}
function UtilsHelper_getCurrentNodeName(context) {
    var _a, _b, _c, _d, _e;
    try {
        const content = (_e = (_d = (_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.hatControllerParams) === null || _a === void 0 ? void 0 : _a.gqlResponse) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.site) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.content;
        if (content) {
            const pageType = UtilsHelper_getCurrentPageType(context);
            if (pageType === types_1.SiteContentType.SiteNode) {
                const categoryName = lodash_1.default.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.data.name', '');
                if (categoryName)
                    return categoryName;
                const slug = content.slug || '';
                return lodash_1.default.capitalize(UtilsHelper_slugify(slug));
            }
            else if (pageType === types_1.SiteContentType.Story) {
                return content.title || '';
            }
            else if (pageType === types_1.SiteContentType.CustomAction) {
                return content.action || '';
            }
            else if ([types_1.SiteContentType.Source, types_1.SiteContentType.Topic].includes(pageType)) {
                return content.name || '';
            }
            else if (pageType === types_1.SiteContentType.Author) {
                return content.name || '';
            }
        }
    }
    catch (e) {
        if ((process.env.LOG_LEVEL || 'info') !== 'silent') {
            console.error('Error when getting current node name', e instanceof Error ? e.message : e);
        }
    }
    return '';
}
function UtilsHelper_ensureHttps(url) {
    return url.replace('http://', 'https://');
}
function UtilsHelper_getDomain(context, alwaysProduction = false) {
    return alwaysProduction ? context.domain : UtilsHelper_isDevelopmentMode() ? 'http://localhost' : context.domain;
}
function UtilsHelper_getCurrentUrlWithDomain(context, alwaysProduction = false) {
    return UtilsHelper_getDomain(context, alwaysProduction) + context.url;
}
function UtilsHelper_getCurrentNodeCategoryId(context) {
    return lodash_1.default.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id', null);
}
function UtilsHelper_generateRandomString(length = 8) {
    return Math.random().toString(20).substr(2, length);
}
function UtilsHelper_getQueryParam(param, context) {
    let val = lodash_1.default.get(context, ['hatControllerParams', 'urlWithParsedQuery', 'query', param], null);
    if (val && typeof val === 'string') {
        val = UtilsHelper_stripHtmlTags(val);
    }
    return val;
}
function UtilsHelper_getSearchQueryParamKey() {
    return lodash_1.default.get(global, 'searchQueryParamKey', 'q');
}
function UtilsHelper_stripHtmlTags(userInput) {
    return userInput.replace(/(<([^>]+)>)/gi, "");
}
function UtilsHelper_slugify(slug) {
    return slug
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
function UtilsHelper_getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'Unknown error';
}
//# sourceMappingURL=UtilsHelper.js.map