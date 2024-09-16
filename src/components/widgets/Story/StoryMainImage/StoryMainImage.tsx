import React from 'react';
import _ from 'lodash';
import {StoryMainImageParams} from "./types";
import {RingImage} from "../../../common/RingImage";
import {StoryMainImageCaption} from "./StoryMainImageCaption";
import {
    WidgetHelper_getWidgetCssClasses
} from "../../../../helpers/WidgetHelper";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../helpers/ImageHelper";
import {TransformType} from "../../../../helpers/AcceleratorImagesHelper";
import {StoryMainImage_getData} from "./StoryMainImageGetData";


export async function StoryMainImage({widgetConfig, context}: StoryMainImageParams) {
    const response = await StoryMainImage_getData({widgetConfig, context});
    const imageDimensions = ImageHelper_getImageDimensionsFromObject(widgetConfig, context);

    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');
    // TransformType.None because we do transform on API level
    return <div className={WidgetHelper_getWidgetCssClasses('StoryMainImage', widgetConfig, context)}>
        {imgSrc ? <>
            <RingImage priority={true} transform={TransformType.None} src={imgSrc} alt={caption || ''}
                       width={imageDimensions.width} height={imageDimensions.height}/>
            {caption && <StoryMainImageCaption caption={caption}/>}
        </> : null}
    </div>
}

