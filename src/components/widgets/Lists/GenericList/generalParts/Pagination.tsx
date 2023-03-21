import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import {GenericListResponse, GenericListWidgetConfig} from "../types";
import {RingLink} from "../../../../common/RingLink";
import * as _ from 'lodash';
import {UtilsHelper} from "../../../../../helpers/UtilsHelper";

export default function Pagination(
    {context, widgetConfig, response, currentPage}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse,
            currentPage: number,
        }) {

    const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname');
    const total = response.data?.stories.total;
    const pages = Math.ceil(total / UtilsHelper.convertToInt(widgetConfig.paginationElements));
    if (pages === 1) {
        return null;
    }

    let buttons: Array<React.ReactNode> = [];
    if (currentPage > 1) {
        buttons.push(<li className={['prev'].join(' ')}>
            <RingLink rel={'prev'}
                      href={currentUrl + '?page=' + (currentPage - 1)}>&#60;</RingLink>
        </li>);
    }


    for (let i = 1; i < pages + 1; i++) {
        buttons.push(<li className={currentPage == i ? 'active' : ''}>
            <RingLink
                href={currentUrl + '?page=' + i}>{i}</RingLink>
        </li>);
    }

    if (currentPage < pages) {
        buttons.push(<li className={['prev'].join(' ')}>
            <RingLink rel={'next'}
                      href={currentUrl + '?page=' + (currentPage + 1)}>&#62;</RingLink>
        </li>);
    }
    return (
        <ul className={['Pagination'].join(' ')}>
            {buttons}
        </ul>
    )
}

