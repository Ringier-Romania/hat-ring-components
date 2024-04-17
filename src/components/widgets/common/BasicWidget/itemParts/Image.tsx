import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage} from "../../../../common/RingImage";
import {
    WidgetHelper_getAppropriateTeaserImage,
    WidgetHelper_renderEmptyComponent,
} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../../helpers/ImageHelper";
import {TransformType} from "../../../../../helpers/AcceleratorImagesHelper";
import {UtilsHelper_isMobile} from "../../../../../helpers/UtilsHelper";

export default async function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {
    let globalCustomRole = '';
    const image = data.image || data.originalContent?.image;
    let customTeaserImageUrl: string | null = null;

    if (!image || !image.url) {
        return WidgetHelper_renderEmptyComponent('Image');
    }

    const isBig = widgetConfig.countBig ? itemIndex < widgetConfig.countBig : false;
    const sizes = isBig
        ? ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'bigImageSize', 'bigImageSizeMobile', '0x0')
        : ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'standardImageSize', 'standardImageSizeMobile', '0x0');

    const preloadCount = UtilsHelper_isMobile(context) ? (Number(widgetConfig?.mobilePreloadImagesCount) || 0) : (Number(widgetConfig?.preloadImagesCount) || 0);
    const isPriority = (preloadCount >= itemIndex + 1) || false;

    if (widgetConfig.section_name || widgetConfig.sectionGroup) {
        customTeaserImageUrl = await WidgetHelper_getAppropriateTeaserImage(widgetConfig, context, data.leads || [], isBig);
    }

    const ringImageProps = {
        src: customTeaserImageUrl || image.url,
        alt: image.caption || data.title || '',
        transform: TransformType.ResizeCropAuto,
        width: sizes.width,
        height: sizes.height,
        priority: isPriority
    };

    return (
        <div className={['Image', isBig ? 'bigImage' : ''].join(' ')}>
            <RingImage {...ringImageProps} />
        </div>
    )
}

Image.getFragment = (widgetConfig) => {
    return {
        query: gql`fragment ImageFragment on SectionItem {
            image {
                url,
                caption
            }
            leads {
                role {
                    code
                }
                image {
                    url
                }
            }
            originalContent {
                ... on Story {
                    image {
                        url,
                        caption
                    }
                }
            }
        }`
    }
}
