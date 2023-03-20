import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";
import {StoryMainImageCaption} from "./StoryMainImageCaption";
import {RingImage, TransformType} from "../../common/RingImage";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

export interface StoryMainImageResponse {
    "data": {
        "story": {
            "image": {
                "url": string,
                "caption": string | null
            }
        }
    }
}

export interface StoryMainImageParams extends ComponentParams {
    widgetConfig: {
        width?: number,
        height?: number,
        response?: StoryMainImageResponse
    }
}

export async function StoryMainImage(params: StoryMainImageParams) {
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

    const variables = {
        storyId: params.context.id,
        imageWidth: params.widgetConfig?.width || 1920,
        imageHeight: params.widgetConfig?.height || 768,
    };

    var response = params.widgetConfig?.response;
    if (!response) {
        response = await WebsiteApiProvider.call(query, variables) as StoryMainImageResponse;
    }

    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');
    // TransformType.None because we do transform on API level
    return imgSrc ? <>
        <RingImage priority={true} transform={TransformType.None} src={imgSrc} alt={caption || ''}
                   width={params.widgetConfig.width} height={params.widgetConfig.height}/>
        <StoryMainImageCaption {...params} caption={caption}/>
    </> : null;
}

