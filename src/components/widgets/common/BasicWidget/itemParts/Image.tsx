import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
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
        return WidgetHelper.renderEmptyComponent('Image');
    }

    const isBig = widgetConfig.countBig ? itemIndex < widgetConfig.countBig : false;
    const sizes = isBig ? (widgetConfig.bigImageSize || '0x0').split('x') : (widgetConfig.standardImageSize || '0x0').split('x');

    const ringImageProps = {
        src: image.url,
        alt: image.caption || data.title || '',
        transform: TransformType.ResizeCropAuto,
        width: Number(sizes[0]),
        height: Number(sizes[1])
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
