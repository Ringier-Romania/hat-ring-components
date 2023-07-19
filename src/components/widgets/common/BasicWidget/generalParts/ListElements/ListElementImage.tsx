import React from 'react';
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementImageData} from "../../types";
import {RingImage, RingImageProps, TransformType} from "../../../../../common/RingImage";

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
        alt: data.caption,
    };

    if(!data.imageDim.width || !data.imageDim.height) {
        delete ringImageProps.width;
        delete ringImageProps.height;
        delete ringImageProps.transform;
        ringImageProps.fill = true;
    }

    // @TODO: add priority from config and other props
    return (
        (data.url) ?
            <div className={['ListElementImage', (!data.imageDim.width || !data.imageDim.height) ? 'listElementImageWrapper': ''].join(' ')}>
                {/* @ts-ignore */}
                <RingImage {...ringImageProps} className={(!data.imageDim.width  || !data.imageDim.height) ? 'listElementImageFill' : '' }/>
            </div> :
            <></>
    );
}

