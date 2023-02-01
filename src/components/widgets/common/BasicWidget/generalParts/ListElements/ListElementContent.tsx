import React from 'react';
import ListElementsImage from "./ListElementsImage";
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementsData} from "../../types";
import _ from "lodash";

export default function ListElementContent (
    {context, widgetConfig, data} : {
        context: AppContext,
        widgetConfig: BasicWidgetConfig,
        data: ListElementsData
    }
) {
    const imageProps = {
        url: data['Image src'],
        caption: data.Title,
        imageDim: _.get(data, 'Image dimensions (eg. 600x300)', ''),
    };
    const customCssClass = _.get(data, 'Custom CSS Class', '');

    return <div className={['LayoutItem', customCssClass].join(' ')}>
        {data['Image src'] && <ListElementsImage context={context} widgetConfig={widgetConfig} data={imageProps}/>}
        {data.Title && <p className="Title">{data.Title}</p>}
        {data.Description && <div className="Description">{data.Description}</div>}
        {data.Text && <div className="Text">{data.Text}</div>}
    </div>;
};
