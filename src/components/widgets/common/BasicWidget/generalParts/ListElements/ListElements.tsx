import React from 'react';
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../../types";
import {RingLink} from "../../../../../common/RingLink";
import ListElementContent from "./ListElementContent";
import * as _ from "lodash";

export default function ListElements(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {

    const headerTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;
    let headerTagLevel = 6;

    const itemsHeaderArr = headerTag.split('h');
    if (itemsHeaderArr.length === 2) {
        headerTagLevel = _.clamp(Number(itemsHeaderArr[1]), 2, 6);
    }

    const colClass = Math.floor(12 / parseInt(widgetConfig.columns || '0'));
    return (
        <div className={['ListElements'].join(' ')}>
            {widgetConfig.listElements && widgetConfig.listElements.map(element => {
                return <div className={['Item', 'col' + colClass].join(' ')}>
                    {
                        element['Link url'] ?
                            <RingLink href={element['Link url']}>
                                <ListElementContent context={context} widgetConfig={widgetConfig} data={element} headerTagLevel={headerTagLevel} childLevel={1}/>
                            </RingLink> :
                            <ListElementContent context={context} widgetConfig={widgetConfig} data={element} headerTagLevel={headerTagLevel} childLevel={1}/>
                    }
                </div>;
            })}
        </div>
    );
}
