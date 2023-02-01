import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import RingImage, {TransformType} from "../../../../common/RingImage";

export default function Image(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if(!data.image && !data.originalContent.image){
        return null;
    }

    const sizes = widgetConfig.standardImageSize.split('x');

    const ringImageProps = {
        src:  data.image?.url || data.originalContent.image?.url,
        alt: data.originalContent.image.caption || data.title || '',
        transform: TransformType.ResizeCropAuto,
        width: Number(sizes[0]),
        height: Number(sizes[1])
    };


    // @TODO: add priority from config and other props
    return (
        (data.image || data.originalContent.image) ?
            <div className={['Image'].join(' ')}>
                <RingImage {...ringImageProps} />
            </div> :
            <></>
    )
}
