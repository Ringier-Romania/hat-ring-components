"use server";
import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {StoryMainImageParams, StoryMainImageResponse} from "./types";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {RingImage, TransformType} from "../../../common/RingImage";
import {StoryMainImageCaption} from "./StoryMainImageCaption";
import {WidgetHelper} from "../../../../helpers/WidgetHelper";


export async function StoryMainImage({widgetConfig, context}: StoryMainImageParams) {
    const query = gql`
        query($storyId: UUID, $imageWidth:Int!, $imageHeight:Int!){
            story(id:$storyId){
                image{
                    url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}}),
                    caption
                }
            }
        }
    `;

    const imageDimensions = WidgetHelper.getImageDimensionsFromWidgetConfig(widgetConfig, context);

    const variables = {
        storyId: context.id,
        imageWidth: imageDimensions.width,
        imageHeight: imageDimensions.height,
    };

    let response = widgetConfig?.response;
    if (!response) {
        response = await WebsiteApiProvider.call(query, variables) as StoryMainImageResponse;
    }

    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');
    // TransformType.None because we do transform on API level
    return imgSrc ? <>
        <RingImage priority={true} transform={TransformType.None} src={imgSrc} alt={caption || ''}
                   width={imageDimensions.width} height={imageDimensions.height}/>
        {caption && <StoryMainImageCaption caption={caption}/>}
    </> : null;
}

