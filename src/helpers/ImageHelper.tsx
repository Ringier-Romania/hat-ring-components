import {UtilsHelper_isMobile} from "./UtilsHelper";
import {ConfigHelper_getGeneralConfig} from "./ConfigHelper";
import {AppContext} from "../types/types";
import {TransformType} from "./OcdnHelper";
import {RingImageObject} from "../components/common/RingImageObject";

export async function ImageHelper_getDefaultImageData(context, width, height, transform = TransformType.ResizeCropAuto, format = ['png']) {

    const generalSettings = await ConfigHelper_getGeneralConfig(context);

    if (generalSettings) {
        const src = generalSettings.defaultImage;

        return RingImageObject(src, width, height, transform, format);
    }

    return null;
}

/**
 * Generate object of dimensions {width, height} from object
 * @param object: any
 * @param context
 * @param desktopFieldName
 * @param mobileFieldName
 * @param defaultSizesString
 * @return {width: SafeNumber, height: SafeNumber}
 */
export function ImageHelper_getImageDimensionsFromObject(object, context: AppContext, desktopFieldName = 'standardImageSize', mobileFieldName = 'imageSizeMobile', defaultSizesString = '800x450'):
    { width: number | `${number}`, height: number | `${number}` } {
    let dimensionsString: string = '';
    if (UtilsHelper_isMobile(context)) {
        if (object[mobileFieldName]) {
            dimensionsString = object[mobileFieldName];
        } else {
            if (object[desktopFieldName]) {
                dimensionsString = object[desktopFieldName];
            }
        }
    } else {
        if (object[desktopFieldName]) {
            dimensionsString = object[desktopFieldName];
        }
    }

    if (dimensionsString === '') {
        dimensionsString = defaultSizesString;
    }
    const sizes = dimensionsString.split('x');
    return {width: parseInt(sizes[0]), height: parseInt(sizes[1])};
}