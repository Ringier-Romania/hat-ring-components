import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";

export default function Header(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse
        }) {
    const headerText = widgetConfig.labelValue;

    if (!headerText) {
        return WidgetHelper.renderEmptyComponent('Header');
    }

    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;
    // @todo dynamic text?
    const headerUrl = widgetConfig.labelLink;

    return (
        <div className={['Header'].join(' ')}>
            {headerUrl && headerText
            ? <RingLink href={headerUrl}>
                <HeaderTag>{headerText}</HeaderTag>
            </RingLink>
            : <HeaderTag>{headerText}</HeaderTag>}
        </div>
    )
}

