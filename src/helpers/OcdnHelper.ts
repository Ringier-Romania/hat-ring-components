const {OcdnUrl} = require('@ras-tech/ocdn');

export enum TransformType {
    ResizeCropAuto = 'resizeCropAuto',
    Resize = 'resize',
    None = 'none'
}

export function OcdnHelper_getUrl(src, width, height, transformType, format = 'original') {
    const ocdnBucketName = process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME!;
    const ocdnTransformKey = process.env.NEXT_PUBLIC_OCDN_TRANSFORM_KEY!;

    if (ocdnBucketName && ocdnTransformKey) {
        try {
            const cropImage = new OcdnUrl(src);
            cropImage.setKey(ocdnTransformKey);
            cropImage.setBucket(ocdnBucketName);
            if (transformType === TransformType.Resize) {
                cropImage.resize(width, height);
            } else {
                cropImage.resizeCropAuto(width, height);
            }
            cropImage.setDomain('ocdn.eu');
            cropImage.imageFormat(format);
            src = cropImage.getUrl();
        } catch (e) {
            console.info('Unable to transform image');
        }
    }

    return src;
}
