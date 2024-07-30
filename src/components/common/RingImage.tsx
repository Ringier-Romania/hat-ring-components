import React, {ImgHTMLAttributes} from "react";

//@TODO AStro images import { Image } from 'astro:assets';
import styles from "../../../styles/common/RingImage.module.scss";
import {UtilsHelper_getExtension} from "@hatRingHelpers/UtilsHelper";
import {AcceleratorImagesHelper_getUrl, TransformType} from "@hatRingHelpers/AcceleratorImagesHelper";
import {RingImagePreload} from "./RingImagePreload";

export interface RingImageProps extends ImgHTMLAttributes<any> {
    transform?: TransformType,
    priority?: boolean,
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

    if (isResizeable && transform !== TransformType.None) {
        src = AcceleratorImagesHelper_getUrl(src, props.width, props.height, props.transform);
    }

    return <>
        <picture>
            <img {...props} className={['RingImage', styles.RingImage, props.className].join(' ')} src={src}/>
        </picture>
        {props.priority && <RingImagePreload src={src}/>}
    </>
}
