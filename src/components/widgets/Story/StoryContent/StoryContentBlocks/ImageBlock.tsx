import React from "react";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {ImageBlockParams} from "../types";
import {UtilsHelper_convertToInt} from "../../../../../helpers/UtilsHelper";

export default function ImageBlock({blockData, widgetConfig}: ImageBlockParams) {
    const {title, alt, image, url, link} = blockData;
    let imageWidth = image.width;
    let imageHeight = image.height;
    let maxImageWidth = widgetConfig.standardImageWidth && UtilsHelper_convertToInt(widgetConfig.standardImageWidth);
    let maxImageHeight = widgetConfig.standardImageHeight && UtilsHelper_convertToInt(widgetConfig.standardImageHeight);

    if (maxImageWidth && maxImageWidth < imageWidth) {
        imageHeight = UtilsHelper_convertToInt(maxImageWidth * imageHeight / imageWidth);
        imageWidth = maxImageWidth;
    }

    if (maxImageHeight && maxImageHeight < imageHeight) {
        imageWidth = UtilsHelper_convertToInt(maxImageHeight * imageWidth / imageHeight);
        imageHeight = maxImageHeight;
    }

    const img = <RingImage priority={true} src={url} alt={alt || ''} width={imageWidth} height={imageHeight}
                           transform={TransformType.ResizeCropAuto}/>;

    return <div className={['ImageBlock', 'alignment-' + blockData.alignment].join(' ')}>
        {
            link ?
                <RingLink href={link.url}>
                    {img}
                </RingLink> :
                img
        }
        <div className="imgMetaData">
            {title && <span className="caption">{title}</span>}
            {image.description && <span className="description">{image.description}</span>}
            {/* TODO add translation */}
            {image.sources?.length && <span className="copyright">{`${image.sources[0].source.name}`}</span>}
        </div>
    </div>
}
