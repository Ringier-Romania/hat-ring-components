import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
const {OcdnUrl} = require('@ras-tech/ocdn');

export default function Image(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if(!data.image){
        return null;
    }

    const ocdnBucketName = process.env.OCDN_BUCKET_NAME!;
    const ocdnTransformKey = process.env.OCDN_TRANSFORM_KEY!;
    let imageUrl = data.image.url;

    if(ocdnBucketName && ocdnTransformKey){
        const cropImage = new OcdnUrl();
        const sizes = widgetConfig.standardImageSize.split('x');
        cropImage.init(data.image.url);
        cropImage.setKey(ocdnTransformKey);
        cropImage.setBucket(ocdnBucketName);
        cropImage.resizeCropAuto(sizes[0],sizes[1]);
        imageUrl = cropImage.getUrl();
    }



    return (
        data.image ?
            <div className={['Image'].join(' ')}>
                <img src={imageUrl}/>
            </div> :
            <></>

    )
}

