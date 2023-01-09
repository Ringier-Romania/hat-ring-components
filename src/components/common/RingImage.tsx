import Image, {ImageProps, ImageLoaderProps} from "next/image";
import React from "react";
const { OcdnUrl } = require('@ras-tech/ocdn');

export function ocdnLoader({ src, width, quality }: ImageLoaderProps) {
    const ocdnBucketName = process.env.OCDN_BUCKET_NAME!;
    const ocdnTransformKey = process.env.OCDN_TRANSFORM_KEY!;

    if (ocdnBucketName && ocdnTransformKey) {
        const cropImage = new OcdnUrl();
        cropImage.init(src);
        cropImage.setKey(ocdnTransformKey);
        cropImage.setBucket(ocdnBucketName);
        cropImage.resizeCropAuto(200, 120);
        src = cropImage.getUrl();
    }

    // return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
    return src;
}
// TODO: checkout if they fixed bug with backend rendering https://github.com/vercel/next.js/issues/41924
export default function RingImage(props: ImageProps) {
    // TODO: handle crop/resize cases
    return <Image {...props} loader={ocdnLoader} />
}

