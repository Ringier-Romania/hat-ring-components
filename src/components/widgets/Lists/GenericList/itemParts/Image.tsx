import React from 'react';
import {AppContext} from "../../../../../types/types";
import {RingImage} from "../../../../common/RingImage";
import {
    WidgetHelper_getAppropriateTeaserImage,
    WidgetHelper_renderEmptyComponent
} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import {ConfigHelper_getGeneralConfig} from "../../../../../helpers/ConfigHelper";
import {UtilsHelper_isMobile} from "../../../../../helpers/UtilsHelper";

export default async function Image(
    {itemIndex, context, widgetConfig, data}:
        {
            itemIndex: number,
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {


    let image = data.image;
    let customTeaserImageUrl: string | null = null;

    if (!image || !image.url) {
        const generalConfig = await ConfigHelper_getGeneralConfig(context);
        if (generalConfig && generalConfig.defaultImage) {
            // @ts-ignore
            image = {
                url: generalConfig.defaultImage as string
            }
        } else {
            return WidgetHelper_renderEmptyComponent('Image');
        }
    }

    const isMobile = UtilsHelper_isMobile(context);
    const sizes = ((isMobile ? widgetConfig.imageSizeMobile : widgetConfig.imageSize) || '400x300').split('x');
    const preloadCount = isMobile ? (Number(widgetConfig?.mobilePreloadImagesCount) || 0) : (Number(widgetConfig?.preloadImagesCount) || 0);
    const isPriority = (preloadCount >= itemIndex + 1) || false;

    customTeaserImageUrl = await WidgetHelper_getAppropriateTeaserImage(widgetConfig, context, data.leads || []);


    const ringImageProps = {

        src: customTeaserImageUrl || (image && image.url) as string,
        alt: (image && image.caption) || data.title || '',
        width: Number(sizes[0]),
        height: Number(sizes[1]),
        priority: isPriority
    };

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
            leads {
                role {
                    code
                }
                image {
                    url
                }
            }
            image {
                url(transforms:{resizeCropAuto:{width:$mainImageWidth,height:$mainImageHeight}}),
                caption
            }
        }`
    }
}
