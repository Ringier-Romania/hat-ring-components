import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponse, GenericListWidgetConfig} from "../types";
import {RingLink} from "../../../../common/RingLink/RingLink";
import _ from 'lodash';
import {UtilsHelper_convertToInt} from "../../../../../helpers/UtilsHelper";

const MAX_OFFSET = 1000;

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
    const perPageAllItems = UtilsHelper_convertToInt(widgetConfig.perPageAllItems) || UtilsHelper_convertToInt(widgetConfig.paginationElements);
    const pages = Math.ceil(total / perPageAllItems);
    const lastAllowedPage = Math.ceil((MAX_OFFSET - perPageAllItems) / perPageAllItems);
    const lastPage = Math.min(pages, lastAllowedPage);

    if (pages === 1) {
        return null;
    }

    let buttons: Array<React.ReactNode> = [];
    if (currentPage > 1) {
        buttons.push(
            <li className='prev'>
                <RingLink rel={'prev'} href={currentUrl + '?page=' + (currentPage - 1)}>
                    &#60;
                </RingLink>
            </li>
        );

        for (let i = 1; i < Math.min(3, currentPage); i++) {
            buttons.push(<li><RingLink href={currentUrl + '?page=' + i}>{i}</RingLink></li>);
        }

        if (currentPage > 4) {
            buttons.push(<li>...</li>);
        }

        for (let i = Math.max(3, currentPage - 1); i < currentPage; i++) {
            buttons.push(<li><RingLink href={currentUrl + '?page=' + i}>{i}</RingLink></li>);
        }
    }

    buttons.push(
        <li className='active'>
            <RingLink href={currentUrl + '?page=' + currentPage}>
                {currentPage}
            </RingLink>
        </li>
    );

    if (currentPage < lastPage) {
        for (let i = currentPage + 1; i <= Math.min(currentPage + 1, lastPage); i++) {
            buttons.push(<li><RingLink href={currentUrl + '?page=' + i}>{i}</RingLink></li>);
        }

        if (currentPage + 3 < lastPage) {
            buttons.push(<li>...</li>);
        }

        for (let i = Math.max(currentPage + 2, lastPage - 1); i <= lastPage; i++) {
            buttons.push(<li><RingLink href={currentUrl + '?page=' + i}>{i}</RingLink></li>);
        }

        buttons.push(
            <li className='prev'>
                <RingLink rel={'next'} href={currentUrl + '?page=' + (currentPage + 1)}>
                    &#62;
                </RingLink>
            </li>
        );
    }
    return (
        <ul className='Pagination'>
            {buttons}
        </ul>
    )
}
