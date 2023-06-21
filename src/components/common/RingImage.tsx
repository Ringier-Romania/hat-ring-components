import Image, {ImageProps, ImageLoaderProps} from "next/image";
import React from "react";
const { OcdnUrl } = require('@ras-tech/ocdn');
import styles from "../../../styles/common/RingImage.module.scss";

export interface RingImageProps extends ImageProps {
    transform?: TransformType
}

export enum TransformType {
    ResizeCropAuto = 'resizeCropAuto',
    Resize = 'resize',
    None = 'none'
}

function getPlaceholderData(width, height) {
    const _width = `width='${width || 16}'`;

    const _height = `height='${height || 9}'`;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' ${_width} ${_height}></svg>`;

    return `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`;
}

function ocdnLoader(src, width, height, transformType) {
    const ocdnBucketName = process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME!;
    const ocdnTransformKey = process.env.NEXT_PUBLIC_OCDN_TRANSFORM_KEY!;

    try{
        if (ocdnBucketName && ocdnTransformKey) {
            const cropImage = new OcdnUrl(ocdnTransformKey, src);
            cropImage.setBucket(ocdnBucketName);
            cropImage.setDomain('ocdn.eu');
            if (transformType === TransformType.Resize) {
                cropImage.resize(width, height);
            } else {
                cropImage.resizeCropAuto(width, height);
            }
            src = cropImage.getUrl();
        }
    }catch(e){
        console.info('Unable to transform image',e);
    }
    
    return src;
}

// TODO: checkout if they fixed bug with backend rendering https://github.com/vercel/next.js/issues/41924
export function RingImage(props: RingImageProps) {
    let src = props.src;
    let unoptimized = props.unoptimized;
    let blurDataURL = props.blurDataURL;
    let placeholder = props.placeholder;
    let transform = props.transform || TransformType.None;

    if (!props.fill) {
        blurDataURL = getPlaceholderData(props.width, props.height);
        placeholder = 'blur';
    }
    unoptimized = true;
    if (transform !== TransformType.None) {
        src = ocdnLoader(src, props.width, props.height, props.transform);
    }

    return <Image {...props} className={['RingImage', styles.RingImage, props.className].join(' ')} src={src} unoptimized={unoptimized} placeholder={placeholder} blurDataURL={blurDataURL}/>
}
