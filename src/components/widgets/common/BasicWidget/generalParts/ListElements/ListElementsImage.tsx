import React from 'react';
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementsImage} from "../../types";
import RingImage, {RingImageProps, TransformType} from "../../../../../common/RingImage";
import styles from "../../../../../../../styles/widgets/common/BasicWidget.module.scss";

export default function ListElementsImage(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: ListElementsImage,
        }) {

    if (!data.url) {
        return null;
    }

    let sizes = '0x0';
    sizes = data.imageDim || widgetConfig.listElementsImageSize || '0x0';
    const imageWidth = Number(sizes.split('x')[0]);
    const imageHeight = Number(sizes.split('x')[1]);

    const ringImageProps: RingImageProps = {
        src: data.url,
        width: imageWidth,
        height: imageHeight,
        transform: TransformType.ResizeCropAuto,
        alt: data.caption,
    };

    if(!imageWidth || !imageHeight) {
        delete ringImageProps.width;
        delete ringImageProps.height;
        delete ringImageProps.transform;
        ringImageProps.fill = true;
    }

    // @TODO: add priority from config and other props
    return (
        (data.url) ?
            <div className={['Image', (!imageWidth || !imageHeight) ? styles.ListElementsImageWrapper: ''].join(' ')}>
                {/* @ts-ignore */}
                <RingImage {...ringImageProps} className={(!imageWidth || !imageHeight) ? styles.ListElementsImageFill : '' }/>
            </div> :
            <></>
    );
}

