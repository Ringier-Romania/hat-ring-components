import React from "react";
import {
    SeoHelper_currentDefaultImageData,
    SeoHelper_currentDescription,
    SeoHelper_currentLocale,
    SeoHelper_currentSiteName,
    SeoHelper_currentTitle
} from "../../../helpers/seo/SeoHelper";
import {ConfigHelper_currentUrl} from "../../../helpers/ConfigHelper";
import {OpenGraphHelper_getMainStoryImageData} from "../../../helpers/seo/OpenGraphHelper";

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
                    //TODO add support for type
                    type: "image/png"
                }
            ]
        }
    };
}
