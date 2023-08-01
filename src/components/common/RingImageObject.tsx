import {OcdnHelper_getUrl, TransformType} from "../../helpers/OcdnHelper";

export function RingImageObject(src, width, height, transform?: TransformType, format?: string[]) {

    type srcType = {
        [key: string]: string;
    }

    if (transform !== TransformType.None) {
        src = OcdnHelper_getUrl(src,width, height, transform);
    }

    let returnSrcObject: srcType = {};

    if (format && format.length > 0) {
        format.forEach(format => {
            returnSrcObject[format] = OcdnHelper_getUrl(src, width, height, transform, format);
        })

        return {src: returnSrcObject, width: width, height: height};
    }

    return {src, width: width, height: height};
}