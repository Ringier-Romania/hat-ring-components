import React, {CSSProperties} from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import RingImage, {TransformType} from "../../../../common/RingImage";

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

    const sizes = widgetConfig.standardImageSize.split('x');

    // @TODO: add priority from config and other props
    return (
        data.image ?
            <div className={['Image'].join(' ')}>
                <RingImage  priority={false} alt={data.image.caption || data.title || ''} transform={TransformType.ResizeCropAuto} src={ data.image.url} width={Number(sizes[0])} height={Number(sizes[1])}/>
            </div> :
            <></>

    )
}

