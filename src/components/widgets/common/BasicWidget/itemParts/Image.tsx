import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage} from "../../../../common/RingImage";
import {
    WidgetHelper_renderEmptyComponent
} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../../helpers/ImageHelper";
import {TransformType} from "../../../../../helpers/OcdnHelper";

export default function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {
    const image = data.image || data.originalContent?.image;

    if (!image || !image.url) {
        return WidgetHelper_renderEmptyComponent('Image');
    }

    const isBig = widgetConfig.countBig ? itemIndex < widgetConfig.countBig : false;
    const sizes = isBig
        ? ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'bigImageSize', 'bigImageSizeMobile', '0x0')
        : ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'standardImageSize', 'standardImageSizeMobile', '0x0');

    const isMobile = context?.hatControllerParams?.isMobile;
    const preloadCount = isMobile ? (Number(widgetConfig?.mobilePreloadImagesCount) || 0) : (Number(widgetConfig?.preloadImagesCount) || 0);
    const isPriority = (preloadCount >= itemIndex + 1) || false;

    const ringImageProps = {
        src: image.url,
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
