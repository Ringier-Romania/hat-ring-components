import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import RingLink from "../../../../common/RingLink";

export default function SectionElements(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {


    const colClass = Math.floor( 12 /parseInt(widgetConfig.columns));
    const allItemParts = context.customData.itemParts || ItemParts;

    return (
        <div className={['SectionElements'].join(' ')}>
            {response.data.section.items.edges.map(edge => {
                const itemParts =  widgetConfig.showOptions.map((showOption, index) => {
                    const Component = allItemParts[_.upperFirst(showOption)];
                    if (!Component) {
                        console.error(`No item part support ${showOption}`);
                        return <div style={{display: "none"}}>{showOption} item part not supported, yet</div>;
                    }
                    // @ts-ignore
                    return <Component key={ index } context={context} widgetConfig={ widgetConfig } data={ edge.node }/>;
                });
                return <div className={['Item', 'col'+colClass].join(' ')}>
                    <RingLink href={edge.node.url}>
                        {itemParts}
                    </RingLink>
                </div>;
            })}
        </div>
    )
}

