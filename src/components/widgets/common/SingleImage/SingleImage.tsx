import React from "react";
import {RingLink} from "@common/RingLink/RingLink";
import {RingImage, RingImageProps} from "@common/RingImage";
import {
    WidgetHelper_getWidgetCssClasses, WidgetHelper_renderEmptyComponent
} from "@hatRingHelpers/WidgetHelper";
import {ImageConfig, ImageParams} from "./types";
import styles from '../../../../../styles/widgets/common/SingleImage.module.scss';
import {UtilsHelper_getValueIfExists} from "@hatRingHelpers/UtilsHelper";
import {ImageHelper_getImageDimensionsFromObject} from "@hatRingHelpers/ImageHelper";
import {TransformType} from "@hatRingHelpers/AcceleratorImagesHelper";


export function SingleImage(
    {widgetConfig, context}: ImageParams
) {
    const additionalCssClasses = [styles.SingleImage];
    const {width, height} =  ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'imageSize', 'mobileImageSize', '0x0');

    const additionalOptions = UtilsHelper_getValueIfExists(widgetConfig.additionalOptions, []);
    const desktopSrc = UtilsHelper_getValueIfExists(widgetConfig.imageSrc, '');
    const src = context.hatControllerParams.isMobile ? UtilsHelper_getValueIfExists(widgetConfig.mobileImageSrc, desktopSrc) : desktopSrc;
    const urlLink = UtilsHelper_getValueIfExists(widgetConfig.linkUrl, false);

    if(!src) {
        return WidgetHelper_renderEmptyComponent('SingleImage','',true);
    }

    const ringImageProps: RingImageProps = {
        src,
        width,
        height,
        transform: TransformType.ResizeCropAuto,
        alt: UtilsHelper_getValueIfExists(widgetConfig.imageAlt, ''),
        priority: additionalOptions.includes('preloadImage')
    };

    if(!Number(width) || !Number(height)) {
        delete ringImageProps.width;
        delete ringImageProps.height;
        delete ringImageProps.transform;
        //ringImageProps.fill = true; //@TODO
        additionalCssClasses.push("imageFill");
    }

    function renderImage() {
        return <RingImage {...ringImageProps}/>
    }

    return <div className={WidgetHelper_getWidgetCssClasses('SingleImage', widgetConfig, context, additionalCssClasses)}>
        {urlLink
            ? <RingLink
                    href={urlLink}
                    target={additionalOptions.includes('openLinkInNewTab') ? '_blank' : undefined}
                    rel={additionalOptions.includes('openLinkAsExternal') ? 'nofollow' : undefined}>
                    {renderImage()}
            </RingLink>
            : <>
                {renderImage()}
            </>
        }
    </div>;
}
