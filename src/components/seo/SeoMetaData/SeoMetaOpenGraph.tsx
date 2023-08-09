import React from "react";

// Helpers
import {OpenGraphHelper_getMainStoryImageData} from "../../../helpers/seo/OpenGraphHelper";
import {ConfigHelper_currentUrl} from "../../../helpers/ConfigHelper";
import {
    SeoHelper_currentDefaultImageData,
    SeoHelper_currentDescription,
    SeoHelper_currentLocale,
    SeoHelper_currentSiteName,
    SeoHelper_currentTitle
} from "../../../helpers/seo/SeoHelper";

/**
 * Method used to render opengraph elements
 * TODO: (1) add support for different type/s of images
 * @param {object} context > Application context
 * @constructor
 */
export async function SeoMetaOpenGraph(context) {
    const imageData = await OpenGraphHelper_getMainStoryImageData(context); //format: png
    const defaultImageData = await SeoHelper_currentDefaultImageData(context); //format: png

    return {
        openGraph: {
            title: await SeoHelper_currentTitle(context, 'og-title'),
            description: await SeoHelper_currentDescription(context, 'og-description'),
            url: await ConfigHelper_currentUrl(context),
            siteName: await SeoHelper_currentSiteName(context),
            locale: await SeoHelper_currentLocale(context),
            images: [
                {
                    url: imageData.src !== undefined ? imageData.src : defaultImageData !== null ? defaultImageData.src.png : null,
                    secure_url: imageData.src !== undefined && imageData.src.search('https://') ? imageData.src : defaultImageData !== null ? defaultImageData.src.png : null,
                    width: imageData.src !== undefined ? imageData.width : defaultImageData !== null ? defaultImageData.width : null,
                    height: imageData.src !== undefined ? imageData.height : defaultImageData !== null ? defaultImageData.height : null,
                    caption: imageData.caption,
                    type: "image/png" // TODO: (1)
                }
            ]
        }
    };
}
