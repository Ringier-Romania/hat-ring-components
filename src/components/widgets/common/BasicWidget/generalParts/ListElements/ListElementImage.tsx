import React from 'react';
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementImageData} from "../../types";
import {RingImage, RingImageProps} from "../../../../../common/RingImage";
import {TransformType} from "../../../../../../helpers/AcceleratorImagesHelper";

export default function ListElementImage(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: ListElementImageData,
        }) {

    if (!data.url) {
        return null;
    }

    const ringImageProps: RingImageProps = {
        src: data.url,
        width: data.imageDim.width,
        height: data.imageDim.height,
        transform: TransformType.ResizeCropAuto,
        priority: data.priority,
        alt: (data.customAlt ? data.customAlt : data.caption) || '',
    };

    if(!data.imageDim.width || !data.imageDim.height) {
        delete ringImageProps.width;
        delete ringImageProps.height;
        delete ringImageProps.transform;
    }

    return (
        (data.url) ?
            <div className={['ListElementImage', (!data.imageDim.width || !data.imageDim.height) ? 'listElementImageWrapper': ''].join(' ')}>
                {/* @ts-ignore */}
                <RingImage {...ringImageProps} className={(!data.imageDim.width  || !data.imageDim.height) ? 'listElementImageFill' : '' }/>
            </div> :
            <></>
    );
}

