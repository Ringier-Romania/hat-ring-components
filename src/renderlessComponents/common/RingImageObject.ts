import {AcceleratorImagesHelper_getUrl, TransformType} from "@hatRingHelpers/AcceleratorImagesHelper";
import {ImageFormat} from "@ringpublishing/accelerator-images";

export function RingImageObject(src, width, height, transform?: TransformType, format?: ImageFormat[]) {

    type srcType = {
        [key: string]: string;
    }

    if (transform !== TransformType.None) {
        src = AcceleratorImagesHelper_getUrl(src,width, height, transform);
    }

    let returnSrcObject: srcType = {};

    if (format && format.length > 0) {
        format.forEach(format => {
            returnSrcObject[format] = AcceleratorImagesHelper_getUrl(src, width, height, transform, format);
        })

        return {src: returnSrcObject, width: width, height: height};
    }

    return {src, width: width, height: height};
}
