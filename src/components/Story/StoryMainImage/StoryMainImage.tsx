import React, {CSSProperties} from 'react';
import * as _ from 'lodash';
import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";
import {StoryMainImageCaption} from "./StoryMainImageCaption";
import RingImage, {TransformType} from "../../common/RingImage";
import Head from "next/head";


export interface StoryMainImageParams extends ComponentParams {
    config: {
        width: number,
        height: number,
    }
}

export async function StoryMainImage(params: StoryMainImageParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

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

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query, variables);


    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');

    // TransformType.None because we do transform on API level
    return <>
        <RingImage priority={true} transform={TransformType.None} src={imgSrc} alt={caption || ''} width={params.config.width} height={params.config.height}/>
        <StoryMainImageCaption {...params } caption={caption}/>
    </>;
}

