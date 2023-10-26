import Image, {ImageProps, ImageLoaderProps} from "next/image";
import React from "react";

import styles from "../../../styles/common/RingImage.module.scss";
import {UtilsHelper_getExtension} from "../../helpers/UtilsHelper";
import {OcdnHelper_getUrl, TransformType} from "../../helpers/OcdnHelper";
import {RingImagePreload} from "./RingImagePreload";

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
export function RingImage(props: RingImageProps) {
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

    if (isResizeable && transform !== TransformType.None) {
        src = OcdnHelper_getUrl(src, props.width, props.height, props.transform);
    }

    const avifSrc = OcdnHelper_getUrl(src, props.width, props.height, props.transform, 'avif');
    const webpSrc = OcdnHelper_getUrl(src, props.width, props.height, props.transform, 'webp');


    if (props.priority) {
        if (isAvifWebpTransformAble && src != avifSrc) {
            srcSet.push(avifSrc)
        }
        if (isAvifWebpTransformAble && src != webpSrc) {
            srcSet.push(webpSrc)
        }
        srcSet.push(src as string)
    }
    return <>
        <picture>
            { isAvifWebpTransformAble && src != avifSrc ? <source srcSet={avifSrc} type="image/avif"/> : null}
            { isAvifWebpTransformAble && src != webpSrc ? <source srcSet={webpSrc} type="image/webp"/> : null}
            <Image {...props} className={['RingImage', styles.RingImage, props.className].join(' ')} src={src}
                   unoptimized={unoptimized} placeholder={placeholder} blurDataURL={blurDataURL} priority={false}/>
        </picture>
        {props.priority && <RingImagePreload srcSet={srcSet}/>}
    </>
}
