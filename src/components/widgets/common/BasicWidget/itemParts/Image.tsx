import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {
    WidgetHelper_getImageDimensionsFromWidgetConfig,
    WidgetHelper_renderEmptyComponent
} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

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
        ? WidgetHelper_getImageDimensionsFromWidgetConfig(widgetConfig, context, 'bigImageSize', 'bigImageSizeMobile', '0x0')
        : WidgetHelper_getImageDimensionsFromWidgetConfig(widgetConfig, context, 'standardImageSize', 'standardImageSizeMobile', '0x0');

    const ringImageProps = {
        src: image.url,
        alt: image.caption || data.title || '',
        transform: TransformType.ResizeCropAuto,
        width: sizes.width,
        height: sizes.height
    };


    // @TODO: add priority from config and other props
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
