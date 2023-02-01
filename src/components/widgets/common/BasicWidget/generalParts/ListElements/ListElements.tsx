import React from 'react';
import {AppContext} from "../../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../../types";
import RingLink from "../../../../../common/RingLink";
import ListElementContent from "./ListElementContent";

export default function ListElements(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {


    const colClass = Math.floor(12 / parseInt(widgetConfig.columns));
    return (
        <div className={['ListElements'].join(' ')}>
            {widgetConfig.listElements.map(element => {
                return <div className={['LayoutWrapper', 'col' + colClass].join(' ')}>
                    {
                        element['Link url'] ?
                            <RingLink href={element['Link url']}>
                                <ListElementContent context={context} widgetConfig={widgetConfig} data={element}/>
                            </RingLink> :
                            <ListElementContent context={context} widgetConfig={widgetConfig} data={element}/>
                    }
                </div>;
            })}
        </div>
    );
}
