import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";

export default function SectionElements(
    {context, widgetConfig, response, extendableAttributes}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes
        }) {

    if (_.get(response, 'data.section.items.edges.length', 0) === 0) {
        return WidgetHelper.renderEmptyComponent('SectionElements');
    }

    const allItemParts = extendableAttributes.itemParts || ItemParts;
    const columnsCount = parseInt(widgetConfig.columns || '0');
    const bigElementsCount = Number(widgetConfig.countBig);
    const colNumber = Math.floor(12 / columnsCount);
    const bigElementsClass = bigElementsCount > 0 ? `bigElements${bigElementsCount}` : '';
    const columnsClass = columnsCount > 0 ? `columns${columnsCount}` : '';

    return (
        <div className={['SectionElements', bigElementsClass, columnsClass].join(' ')}>
            {response.data.section.items.edges.map((edge, itemIndex) => {
                const itemParts = widgetConfig.showOptions && widgetConfig.showOptions.map((showOption, index) => {
                    const Component = allItemParts[_.upperFirst(showOption)];
                    if (!Component) {
                        console.error(`No item part support ${showOption}`);
                        return WidgetHelper.renderEmptyComponent(_.upperFirst(showOption), "item part not supported, yet");
                    }

                    return <Component key={index} itemIndex={itemIndex} context={context} widgetConfig={widgetConfig}
                                      data={edge.node}/>;
                });
                const isBig = itemIndex < bigElementsCount;
                const colClass = isBig ? `col12` : `col${colNumber}`;
                const bigElementClass = isBig ? `bigElement` : '';

                return <div className={['Item', colClass, bigElementClass].join(' ')}>
                    <RingLink href={edge.node?.url || '/'}>
                        {itemParts}
                    </RingLink>
                </div>;
            })}
        </div>
    )
}

