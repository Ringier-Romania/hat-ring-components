import React from 'react';
import ListElementImage from "./ListElementImage";
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementsData} from "../../types";
import _ from "lodash";
import {RingLink} from "../../../../../common/RingLink/RingLink";
import {TextReplacer} from "../../../../../common/TextReplacer";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../../../helpers/ImageHelper";

export default function ListElementContent (
    {context, widgetConfig, data, headerTagLevel, childLevel, itemIndex} : {
        context: AppContext,
        widgetConfig: BasicWidgetConfig,
        data: ListElementsData,
        headerTagLevel: number;
        childLevel: number,
        itemIndex: number
    }
) {
    const isMobile = context?.hatControllerParams?.isMobile;
    const preloadCount = isMobile ? (Number(widgetConfig?.mobilePreloadImagesCount) || 0) : (Number(widgetConfig?.preloadImagesCount) || 0);
    const isPriority = (preloadCount >= itemIndex + 1) || false;

    const itemDimensions = ImageHelper_getImageDimensionsFromObject(data, context, 'Image dimensions (eg. 600x300)', 'Image dimensions mobile (eg. 600x300)', '0x0');
    const widgetListDimensions = ImageHelper_getImageDimensionsFromObject(widgetConfig, context, 'listElementsImageSize', 'listElementsImageSizeMobile', '0x0');

    const imageProps = {
        url: isMobile ? (data['Image src mobile'] || data['Image src']) : data['Image src'],
        caption: data.Title,
        imageDim: itemDimensions.width == 0 && itemDimensions.height == 0 ? widgetListDimensions : itemDimensions,
        priority: isPriority,
        customAlt: data['Image alt attribute'],
    };

    const customCssClass = _.get(data, 'Custom CSS Class', '');

    const HeaderTag = (headerTagLevel >= 6 ? 'span' : headerTagLevel) as keyof JSX.IntrinsicElements;
    let ItemHeaderTag = HeaderTag;

    if (headerTagLevel >= 6) {
        ItemHeaderTag = 'span';
    } else {
        ItemHeaderTag = `h${_.clamp(headerTagLevel + 1, 2, 6)}` as keyof JSX.IntrinsicElements;
    }

    function renderChildren() {
        if (data.children && data.children.length > 0) {
            return (<div className={['listElementChildren'].join(' ')}>
                {data.children.map((element, index) => {
                    return (<div className={['listElementChild'].join(' ')}>
                        <ListElementContent context={context} widgetConfig={widgetConfig} data={element} childLevel={childLevel + 1} headerTagLevel={headerTagLevel + 1} itemIndex={itemIndex} key={index}/>
                    </div>)
                })}
            </div>)
        }
        return null;
    }

    return <div className={['ListElementContent', `listElementLevel${childLevel}`, customCssClass].join(' ')}>
        {
            data['Link url'] &&
            <div className={'linkOverlay'}>
                <RingLink href={data['Link url']} title={data.Title || ''}></RingLink>
            </div>
        }
        {data['Image src'] && <ListElementImage context={context} widgetConfig={widgetConfig} data={imageProps}/>}
        {/* @ts-expect-error Server Component */}
        {data.Title && <ItemHeaderTag props={{className: 'title'}} context={context} config={{}} parentComponent={ItemHeaderTag}>
            {data.Title}
        </ItemHeaderTag>}
        {/* @ts-expect-error Server Component */}
        {data.Description && <p props={{className: 'description'}} context={context} config={{}} parentComponent={'p'}>
            {data.Description}
        </p>}
        {/* @ts-expect-error Server Component */}
        {data.Text && <div props={{className: 'text'}} context={context} config={{}} parentComponent={'div'}>
            {data.Text}
        </div>}
        {renderChildren()}
    </div>;
};
