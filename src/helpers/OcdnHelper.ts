
export enum TransformType {
    ResizeCropAuto = 'resizeCropAuto',
    Resize = 'resize',
    None = 'none'
}

export function OcdnHelper_getUrl(src: string | any, width: number | any, height: number | any, transformType: TransformType | undefined, format = 'original') {
    const ocdnBucketName = process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME!;
    const ocdnTransformKey = process.env.NEXT_PUBLIC_OCDN_TRANSFORM_KEY!;


    return src;
}
