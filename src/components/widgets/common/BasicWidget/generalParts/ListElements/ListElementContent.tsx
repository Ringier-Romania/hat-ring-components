import React from 'react';
import ListElementImage from "./ListElementImage";
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementsData} from "../../types";
import _ from "lodash";
import {RingLink} from "../../../../../common/RingLink";

export default function ListElementContent (
    {context, widgetConfig, data, headerTagLevel, childLevel} : {
        context: AppContext,
        widgetConfig: BasicWidgetConfig,
        data: ListElementsData,
        headerTagLevel: number;
        childLevel: number
    }
) {
    const imageProps = {
        url: data['Image src'],
        caption: data.Title,
        imageDim: _.get(data, 'Image dimensions (eg. 600x300)', ''),
    };
    const customCssClass = _.get(data, 'Custom CSS Class', '');

    const HeaderTag = (headerTagLevel >= 6 ? 'span' : headerTagLevel) as keyof JSX.IntrinsicElements;
    let ItemHeaderTag = HeaderTag;

    if (headerTagLevel >= 6) {
        ItemHeaderTag = 'span';
    } else {
        ItemHeaderTag = `h${_.clamp(headerTagLevel, 2, 6)}` as keyof JSX.IntrinsicElements;
    }

    function renderChildren() {
        if (data.children && data.children.length > 0) {
            return (<div className={['listElementChildren'].join(' ')}>
                {data.children.map((element, index) => {
                    return (<div className={['listElementChild'].join(' ')}>
                        {
                            element['Link url'] ?
                                <RingLink href={element['Link url']}>
                                    <ListElementContent context={context} widgetConfig={widgetConfig} data={element} childLevel={childLevel + 1} headerTagLevel={headerTagLevel + 1}/>
                                </RingLink> :
                                <ListElementContent context={context} widgetConfig={widgetConfig} data={element} childLevel={childLevel + 1} headerTagLevel={headerTagLevel + 1}/>
                        }
                    </div>)
                })}
            </div>)
        }
        return null;
    }

    return <div className={['ListElementContent', `listElementLevel${childLevel}`, customCssClass].join(' ')}>
        {data['Image src'] && <ListElementImage context={context} widgetConfig={widgetConfig} data={imageProps}/>}
        {data.Title && <ItemHeaderTag className="title">{data.Title}</ItemHeaderTag>}
        {data.Description && <p className="description">{data.Description}</p>}
        {data.Text && <div className="text">{data.Text}</div>}
        {renderChildren()}
    </div>;
};
