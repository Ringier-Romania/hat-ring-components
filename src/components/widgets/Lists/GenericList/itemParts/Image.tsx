import React from 'react';
import {AppContext} from "../../../../../types/types";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import {ConfigHelper_getGeneralConfig} from "../../../../../helpers/ConfigHelper";

export default async function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    let image = data.image;

    if (!image || !image.url) {
        const generalConfig = await ConfigHelper_getGeneralConfig(context);
        if (generalConfig && generalConfig.defaultImage) {
            image = {
                url: generalConfig.defaultImage as string
            }
        } else {
            return WidgetHelper_renderEmptyComponent('Image');
        }
    }

    const sizes = ((context.hatControllerParams.isMobile ? widgetConfig.imageSizeMobile : widgetConfig.imageSize) || '400x300').split('x');

    const ringImageProps = {
        src: image.url as string,
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
