import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import RingImage, {TransformType} from "../../../../common/RingImage";
import {renderEmptyComponent} from "../../../../../helpers";

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

    const isBig = itemIndex < widgetConfig.countBig;
    const sizes = isBig ? widgetConfig.bigImageSize.split('x') : widgetConfig.standardImageSize.split('x');

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
