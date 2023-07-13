import React from 'react';
import ListElementImage from "./ListElementImage";
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, ListElementsData} from "../../types";
import _ from "lodash";
import {RingLink} from "../../../../../common/RingLink/RingLink";
import {TextReplacer} from "../../../../../common/TextReplacer";

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
                        <ListElementContent context={context} widgetConfig={widgetConfig} data={element} childLevel={childLevel + 1} headerTagLevel={headerTagLevel + 1}/>
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
        {data.Title && <TextReplacer props={{className: 'title'}} context={context} config={{}} parentComponent={ItemHeaderTag}>
            {data.Title}
        </TextReplacer>}
        {/* @ts-expect-error Server Component */}
        {data.Description && <TextReplacer props={{className: 'description'}} context={context} config={{}} parentComponent={'p'}>
            {data.Description}
        </TextReplacer>}
        {/* @ts-expect-error Server Component */}
        {data.Text && <TextReplacer props={{className: 'text'}} context={context} config={{}} parentComponent={'div'}>
            {data.Text}
        </TextReplacer>}
        {renderChildren()}
    </div>;
};
