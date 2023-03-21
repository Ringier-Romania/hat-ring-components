import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import {GenericListExtendableAttributes, GenericListResponse, GenericListWidgetConfig} from "../types";
import * as ItemParts from "./../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {UtilsHelper} from "../../../../../helpers/UtilsHelper";

export default function Items(
    {context, widgetConfig, response, extendableAttributes}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse,
            extendableAttributes: GenericListExtendableAttributes
        }) {

    const allItemParts = extendableAttributes.itemParts || ItemParts;
    const columnsCount = UtilsHelper.convertToInt(widgetConfig.columns) || 1;
    const colNumber = Math.floor(12 / columnsCount);
    return (
        <div className={['Items'].join(' ')}>
            {(response.data?.stories?.edges.map((edge, itemIndex) => {
                const itemParts = widgetConfig.showOptions && widgetConfig.showOptions.map((showOption, index) => {
                    const Component = allItemParts[_.upperFirst(showOption)];
                    if (!Component) {
                        console.error(`No item part support ${showOption}`);
                        return WidgetHelper.renderEmptyComponent(_.upperFirst(showOption), "item part not supported, yet");
                    }

                    return <Component key={index} itemIndex={itemIndex} context={context} widgetConfig={widgetConfig}
                                      data={edge.node}/>;
                });
                const colClass = `col${colNumber}`;
                return <div className={['Item', colClass].join(' ')}>
                    <RingLink href={edge.node?.mainPublicationPoint?.url || '#'}>
                        {itemParts}
                    </RingLink>
                </div>;
            }))}
        </div>
    )
}

