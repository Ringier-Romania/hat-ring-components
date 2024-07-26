import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {GenericListResponse, GenericListWidgetConfig} from "../types";
import {
    UtilsHelper_getQueryParam,
    UtilsHelper_getSearchQueryParamKey,
    UtilsHelper_stripHtmlTags
} from "../../../../../helpers/UtilsHelper";

export default function Header(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse
        }) {
    let headerText = widgetConfig.headerText;

    if (!headerText) {
        return WidgetHelper_renderEmptyComponent('Header','',true);
    }

    const totalItemsString = `${response?.data?.stories?.total || '0'}`;
    const searchValue = UtilsHelper_getQueryParam(UtilsHelper_getSearchQueryParamKey(), context);
    headerText = headerText.replaceAll('{{totalItems}}', totalItemsString);
    headerText = headerText.replaceAll('{{searchValue}}', UtilsHelper_stripHtmlTags(searchValue || ''));

    const HeaderTag = (widgetConfig.headerTag && widgetConfig.headerTag !== 'none' ? widgetConfig.headerTag : 'span' ) as keyof JSX.IntrinsicElements;

    return (
        <div className={['Header'].join(' ')}>
            <HeaderTag>{headerText}</HeaderTag>
        </div>
    )
}

