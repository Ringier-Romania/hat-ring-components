import {AbstractWidgetConfig, WidgetParams} from "@hatTypes/types";

export interface ImageConfig extends AbstractWidgetConfig {
    imageSrc: string,
    mobileImageSrc: string,
    imageSize: string,
    mobileImageSize: string,
    imageAlt: string,
    linkUrl: string,
    additionalOptions: ['openLinkAsExternal' | 'openLinkInNewTab']
}

export interface ImageParams extends WidgetParams {
    widgetConfig: ImageConfig
}
