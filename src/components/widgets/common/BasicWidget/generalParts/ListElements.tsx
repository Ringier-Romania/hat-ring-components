import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../types";
import RingLink from "../../../../common/RingLink";
import {Image} from "../itemParts";
import _ from "lodash";

export default function ListElements(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {


    const colClass = Math.floor(12 / parseInt(widgetConfig.columns));
    const buildElementContent = (element) => {
        const imageProps = {
            image: {
                url: element['Image src'],
                caption: element.title
            },
            url: '',
            type: 'ListElements',
            imageDim: _.get(element, 'Image dimensions (eg. 600x300)', ''),
            originalContent: {}
        };
        const customCssClass = _.get(element, 'Custom CSS Class', '');

        return <div className={['LayoutItem', customCssClass].join(' ')}>
            {/* @ts-ignore */}
            {element['Image src'] && <Image context={context} widgetConfig={widgetConfig} data={imageProps}/>}
            {element.Title && <p className="Title">{element.Title}</p>}
            {element.Description && <div className="Description">{element.Description}</div>}
            {element.Text && <div className="Text">{element.Text}</div>}
        </div>;
    };


    return (
        <div className={['ListElements'].join(' ')}>
            {widgetConfig.listElements.map(element => {
                return <div className={['LayoutWrapper', 'col' + colClass].join(' ')}>
                    {
                        element['Link url'] ?
                            <RingLink href={element['Link url']}>
                                {buildElementContent(element)}
                            </RingLink> :
                            buildElementContent(element)
                    }
                </div>;
            })}
        </div>
    );
}

