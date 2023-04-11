import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import {GenericListResponse, GenericListWidgetConfig} from "../types";

export default function Header(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse
        }) {
    const headerText = widgetConfig.headerText;

    if (!headerText) {
        return WidgetHelper.renderEmptyComponent('Header');
    }

    const HeaderTag = (widgetConfig.headerTag && widgetConfig.headerTag !== 'none' ? widgetConfig.headerTag : 'span' ) as keyof JSX.IntrinsicElements;

    return (
        <div className={['Header'].join(' ')}>
            <HeaderTag>{headerText}</HeaderTag>
        </div>
    )
}

