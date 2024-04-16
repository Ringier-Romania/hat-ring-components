import Image, {ImageProps, ImageLoaderProps} from "next/image";
import React from "react";

import styles from "../../../styles/common/RingImage.module.scss";
import {UtilsHelper_getExtension} from "../../helpers/UtilsHelper";
import {OcdnHelper_getUrl, TransformType} from "../../helpers/OcdnHelper";
import {RingImagePreload} from "./RingImagePreload";
import { AcceleratorImage } from '@ringpublishing/accelerator-images';

export interface RingImageProps extends ImageProps {
    transform?: TransformType
}

function getPlaceholderData(width, height) {
    const _width = `width='${width || 16}'`;

    const _height = `height='${height || 9}'`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' ${_width} ${_height}></svg>`;

    return `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`;
}

// TODO: checkout if they fixed bug with backend rendering https://github.com/vercel/next.js/issues/41924
export function RingImage(props) {
    let src = props.src;
    let unoptimized = props.unoptimized;
    let blurDataURL = props.blurDataURL;
    let placeholder = props.placeholder;
    let transform = props.transform || TransformType.None;

    if (!props.fill && !props.priority) {
        blurDataURL = getPlaceholderData(props.width, props.height);
        placeholder = 'blur';
    }
    unoptimized = true;
    const ext = UtilsHelper_getExtension(src as string)
    const isResizeable = ext != 'svg';
    const isAvifWebpTransformAble = ext ? !['svg', 'gif'].includes(ext) : false;
    const srcSet: Array<string> = [];


    const image = new AcceleratorImage({
        originalImageUrl: src as string,
        transformationKey: 'j0t56uwltg',
        transformationHost: 'images-for-rp.ringpublishing.dev'
    })
        .imageQuality('auto')
        .resize(props.width, props.height)

    const url = image.getUrl();

    let propsCopy = {... props};
    propsCopy.src = url;
    return <>
        <picture>
            <Image {...propsCopy} className={['RingImage', styles.RingImage, props.className].join(' ')}
                   // we force priority={false} because next.js will add preload link, and it doesn't work properly for safari, so we are using with our preload
                   // additionally we override loading because for priority={false} loading is set to 'lazy'
                   unoptimized={unoptimized} placeholder={placeholder} blurDataURL={blurDataURL} priority={false} loading={props.priority ? 'eager' : 'lazy'}/>
        </picture>

    </>
}
