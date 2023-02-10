import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import RingImage, {TransformType} from "../../../../common/RingImage";
import {renderEmptyComponent} from "../../../../../helpers";
import gql from "graphql-tag";

export default function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {
    const image = data.image || data.originalContent.image;

    if (!image) {
        return renderEmptyComponent('Image');
    }

    const isBig = widgetConfig.countBig ? itemIndex < widgetConfig.countBig : false;
    const sizes = isBig ? (widgetConfig.bigImageSize || '0x0').split('x') : (widgetConfig.standardImageSize || '0x0').split('x');

    const ringImageProps = {
        src: isBig ? image.bigImageUrl : image.url,
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
    const sizes = widgetConfig.standardImageSize.split('x');
    const bigSizes = widgetConfig.bigImageSize.split('x');

    const bigImage = widgetConfig.countBig > 0
        ? `bigImageUrl: url(transforms:{resizeCropAuto:{width:$bigImageWidth,height:$bigImageHeight}} )`
        : ''

    const bigImageVars = widgetConfig.countBig > 0
        ? { bigImageWidth: Number(bigSizes[0]), bigImageHeight: Number(bigSizes[1])}
        : {}

    const bigImageVarsTypes = widgetConfig.countBig > 0
        ? { $bigImageWidth: 'Int!', $bigImageHeight: 'Int!'}
        : {}

    return {
        variablesTypes: {
            '$imageWidth': 'Int!',
            '$imageHeight': 'Int!',
            ...bigImageVarsTypes
        },
        variables: {
            imageWidth: Number(sizes[0]),
            imageHeight: Number(sizes[1]),
            ...bigImageVars
        },
        query: gql`fragment ImageFragment on SectionItem {
            image {
                ${bigImage}
                url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}}),
                caption
            }
            originalContent {
                ... on Story {
                    image {
                        ${bigImage}
                        url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}}),
                        caption
                    }
                }
            }
        }`
    }
}
