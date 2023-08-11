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
            tutaj 2
        </div>
    )
}

