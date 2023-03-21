import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import {GenericListResponse, GenericListWidgetConfig} from "../types";
import {RingLink} from "../../../../common/RingLink";
import * as _ from 'lodash';

export default function Pagination(
    {context, widgetConfig, response, currentPage}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse,
            currentPage: number,
        }) {

    const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname');
    const total = response.data.stories.total;
    const pages = Math.ceil(total / widgetConfig.paginationElements);

    let buttons: Array<React.ReactNode> = [];
    for (let i = 1; i < pages + 1; i++) {
        buttons.push(<li className={currentPage == i ? 'active' : ''}>
            <RingLink
                href={currentUrl + '?page=' + i}>{i}</RingLink>
        </li>);
    }
    return (
        <ul className={['Pagination'].join(' ')}>
            {buttons}
        </ul>
    )
}

