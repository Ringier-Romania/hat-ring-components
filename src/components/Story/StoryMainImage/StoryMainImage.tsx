import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {ComponentParams} from "types/types";
import {StoryMainImageCaption} from "./StoryMainImageCaption";
import RingImage, {TransformType} from "components/common/RingImage";
import {WebsiteApiProvider} from "providers/WebsiteApiProvider";


export interface StoryMainImageParams extends ComponentParams {
    config: {
        width: number,
        height: number,
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
        imageWidth: params.config.width,
        imageHeight: params.config.height,
    };

    const response = await WebsiteApiProvider.call(query, variables);
    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');

    // TransformType.None because we do transform on API level
    return <>
        <RingImage priority={true} transform={TransformType.None} src={imgSrc} alt={caption || ''} width={params.config.width} height={params.config.height}/>
        <StoryMainImageCaption {...params } caption={caption}/>
    </>;
}

