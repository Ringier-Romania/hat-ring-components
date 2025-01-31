import {UtilsHelper_isMobile} from "./UtilsHelper";
import {ConfigHelper_getGeneralConfig} from "./ConfigHelper";
import {AppContext} from "../types/types";
import {TransformType} from "./AcceleratorImagesHelper";
import {RingImageObject} from "../renderlessComponents/common/RingImageObject";
import {ImageFormat} from "@ringpublishing/accelerator-images";

export async function ImageHelper_getDefaultImageData(context, width, height, transform = TransformType.ResizeCropAuto, format: ImageFormat[] = ['png']) {

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
    { width: number, height: number } {
    if (!object) return {width: 0, height: 0};
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

export function ImageHelper_getImageDimensionsWithAspectRatio(width: number, height: number, maxWidth: number, maxHeight: number): {
    width: number, height: number
} {
    // Adjust height to maintain aspect ratio if max width is set and less than current width.
    if (maxWidth > 0 && maxWidth < width) {
        height = Math.round(maxWidth * height / width);
        width = maxWidth;
    }

    // Adjust width to maintain aspect ratio if max height is set and less than current height.
    if (maxHeight > 0 && maxHeight < height) {
        width = Math.round(maxHeight * width / height);
        height = maxHeight;
    }
    return {
        width,
        height
    }
}
