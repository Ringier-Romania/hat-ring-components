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
    const hasImageData = imageData && imageData.src !== undefined;
    const src = hasImageData ? imageData.src : defaultImageData?.src?.png ?? null;

    let secureUrl: string | null = null;
    const defaultPngSrc = defaultImageData?.src?.png;

    if (hasImageData) {
        const imageSrc: string = imageData.src;
        if (imageSrc.startsWith("https://")) {
            secureUrl = imageSrc;
        } else if (defaultPngSrc && defaultPngSrc.startsWith("https://")) {
            secureUrl = defaultPngSrc;
        }
    } else if (defaultPngSrc && defaultPngSrc.startsWith("https://")) {
        secureUrl = defaultPngSrc;
    }
    return {
        openGraph: {
            basic: {
                title: await SeoHelper_currentTitle(context, 'og-title') || '',
                url: await ConfigHelper_currentUrl(context),
                type: 'website',
                image: imageData && imageData.src !== undefined ? imageData.src : defaultImageData !== null ? defaultImageData.src.png : ''

            },
            optional: {
                description: await SeoHelper_currentDescription(context, 'og-description'),
                locale: await SeoHelper_currentLocale(context),
                siteName: await SeoHelper_currentSiteName(context),
            },
            image: {
                url: src,
                secureUrl: secureUrl,
                width: hasImageData ? imageData.width : defaultImageData?.width ?? null,
                height: hasImageData ? imageData.height : defaultImageData?.height ?? null,
                caption: imageData?.caption ?? '',
                type: "image/png" // TODO: (1)
            }
        }
    };
}
