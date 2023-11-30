import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import _ from "lodash";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {TextReplacer} from "../../../../common/TextReplacer";

export default function Header(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes,
        }) {
    const headerText = widgetConfig.labelValue;

    if (!headerText) {
        return WidgetHelper_renderEmptyComponent('Header');
    }

    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;
    // @todo dynamic text?
    const headerUrl = widgetConfig.labelLink;

    function renderHeaderText(text) {
        return <>
            {/* @ts-expect-error Server Component */}
            <TextReplacer context={context} config={{}} parentComponent={HeaderTag}>
                {text}
            </TextReplacer>
        </>
    }

    return (
        <div className={['Header'].join(' ')}>
            {headerText}
        </div>
    )
}

