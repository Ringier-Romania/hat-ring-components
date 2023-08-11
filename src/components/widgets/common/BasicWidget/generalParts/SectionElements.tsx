import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {UtilsHelper_getValueIfExists} from "../../../../../helpers/UtilsHelper";

export default function SectionElements(
    {context, widgetConfig, response, extendableAttributes}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes,
        }) {

    const elementsToRender = _.get(response, 'data.section.items.edges', _.get(response, 'data.sectionGroup.sections[0].items.edges', []));
    return <>tutaj 3 {JSON.stringify(elementsToRender)}</>
    if (_.get(elementsToRender, 'length', 0) === 0) {
        return WidgetHelper_renderEmptyComponent('SectionElements');
    }

    const allItemParts = extendableAttributes.itemParts || ItemParts;
    const columnsCount = parseInt(widgetConfig.columns || '0');
    const bigElementsCount = Number(widgetConfig.countBig);
    const colNumber = Math.floor(12 / columnsCount);
    const bigElementsClass = bigElementsCount > 0 ? `bigElements${bigElementsCount}` : '';
    const columnsClass = columnsCount > 0 ? `columns${columnsCount}` : '';
    const maxElements = UtilsHelper_getValueIfExists(widgetConfig.count, null) || _.get(response, 'data.section.items.edges.length');

    console.info('info',maxElements);
    if (maxElements) {
        elementsToRender.length = maxElements;
    }
    return (
        <div className={['SectionElements', bigElementsClass, columnsClass].join(' ')}>
            {elementsToRender.map((edge, itemIndex) => {
                const itemParts = widgetConfig.showOptions && widgetConfig.showOptions.map((showOption, index) => {
                    const Component = allItemParts[_.upperFirst(showOption)];
                    if (!Component) {
                        console.error(`No item part support ${showOption}`);
                        return WidgetHelper_renderEmptyComponent(_.upperFirst(showOption), "item part not supported, yet");
                    }

                    return <Component key={index} itemIndex={itemIndex} context={context} widgetConfig={widgetConfig}
                                      data={edge.node}/>;
                });
                const isBig = itemIndex < bigElementsCount;
                const colClass = isBig ? `col12` : `col${colNumber}`;
                const bigElementClass = isBig ? `bigElement` : '';

                return <div className={['Item', colClass, bigElementClass].join(' ')}>
                    <div className={'linkOverlay'}>
                        <RingLink href={edge.node?.url || '#'} title={edge.node?.title || ''}>
                            {widgetConfig.linkLabel}
                        </RingLink>
                    </div>
                    {itemParts}
                </div>;
            })}
        </div>
    )
}

