import React from 'react';
import {AppContext} from "../../../../../types/types";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";

export default function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    const image = data.image;

    if (!image || !image.url) {
        return WidgetHelper.renderEmptyComponent('Image');
    }

    const sizes = ((context.hatControllerParams.isMobile ? widgetConfig.imageSizeMobile : widgetConfig.imageSize) || '400x300').split('x');

    const ringImageProps = {
        src: image.url,
        alt: image.caption || data.title || '',
        width: Number(sizes[0]),
        height: Number(sizes[1])
    };


    // @TODO: add priority from config and other props
    return (
        <div className={['Image'].join(' ')}>
            <RingImage {...ringImageProps} />
        </div>
    )
}

Image.getFragment = (widgetConfig) => {
    const sizes = (widgetConfig.imageSize || '400x300').split('x');

    return {
        variables: {
            mainImageWidth: Number(sizes[0]),
            mainImageHeight: Number(sizes[1])
        },
        variablesTypes: {
            $mainImageWidth: 'Int!',
            $mainImageHeight: 'Int!',
        },
        query: gql`fragment ImageFragment on Story {
            image {
                url(transforms:{resizeCropAuto:{width:$mainImageWidth,height:$mainImageHeight}}),
                caption
            }
        }`
    }
}
