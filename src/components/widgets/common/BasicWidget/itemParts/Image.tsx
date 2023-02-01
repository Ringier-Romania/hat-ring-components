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

    if (!data.image && !data.originalContent.image) {
        return null;
    }

    let sizes = '0x0';
    if (data.type === 'SectionElements') {
        sizes = widgetConfig.standardImageSize;
    } else if (data.type === 'ListElements') {
        sizes = data.imageDim || widgetConfig.listElementsImageSize || '0x0';
    }

    const imageWidth = Number(sizes.split('x')[0]);
    const imageHeight = Number(sizes.split('x')[1]);

    const ringImageProps = {
        transform: TransformType.None,
        fill: true,
        style: {objectFit: 'contain'},
        src: data.image?.url || data.originalContent?.image?.url,
        priority: false,
        alt: data.originalContent?.image?.caption || data.title || '',
    };

    if (imageWidth && imageHeight) {
        ringImageProps.transform = TransformType.ResizeCropAuto;
        ringImageProps.fill = false;
        // @ts-ignore
        ringImageProps.style = {};
        // @ts-ignore
        ringImageProps.width = imageWidth;
        // @ts-ignore
        ringImageProps.height = imageHeight;
    }


    // @TODO: add priority from config and other props
    return (
        (data.image || data.originalContent.image) ?
            <div className={['Image'].join(' ')}
                 style={imageWidth && imageHeight ? {} : {position: "relative", aspectRatio: 16 / 9}}>
                {/* @ts-ignore */}
                <RingImage {...ringImageProps}/>
            </div> :
            <></>

    );
}

