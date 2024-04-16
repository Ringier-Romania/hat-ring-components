import {AcceleratorImage, ImageFormat} from '@ringpublishing/accelerator-images';

export enum TransformType {
    ResizeCropAuto = 'resizeCropAuto',
    Resize = 'resize',
    None = 'none'
}

export function AcceleratorImagesHelper_getUrl(src: string | any, width: number | any, height: number | any, transformType: TransformType | undefined, format: ImageFormat = 'original') {
    const accImagesEndpoint = process.env.NEXT_PUBLIC_ACC_IMAGES_ENDPOINT!;
    const accImagesTransformationKey = process.env.NEXT_PUBLIC_ACC_IMAGES_TRANSFORMATION_KEY!;

    if (accImagesEndpoint && accImagesTransformationKey) {
        try {

            const image = new AcceleratorImage({
                originalImageUrl: src,
                transformationKey: accImagesTransformationKey,
                transformationHost: accImagesEndpoint
            })
                .imageQuality('auto');
            if (transformType === TransformType.Resize) {
                image.resize(width, height);
            } else {
                image.resizeCropAuto(width, height);
            }

            if(format !== 'original') {
                image.imageFormat(format);
            }

            src = image.getUrl();
        } catch (e) {
            console.info('Unable to transform image ' + src);
        }
    }

    return src;
}
