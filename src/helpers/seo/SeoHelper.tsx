import {ConfigHelper_getLanguage, ConfigHelper_getSeoOpenGraphConfig, ConfigHelper_getSiteName} from "../ConfigHelper";
import {
    ImageHelper_getDefaultImageData,
    ImageHelper_getImageDimensionsFromObject
} from "../ImageHelper";

import {OpenGraphHelper_getMainStoryImageData} from "./OpenGraphHelper";

export function SeoHelper_currentTitle() {
    return "Test title";
}

export function SeoHelper_currentDescription() {
    return "Test description";
}

export function SeoHelper_getServiceName() {
    return "Ring Publishing - all-in-one publishing platform for digital media brands";
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