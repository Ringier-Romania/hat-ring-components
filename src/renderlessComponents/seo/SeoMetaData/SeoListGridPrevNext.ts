import React from "react";
import {AppContext, SiteContentType} from "../../../types/types";
import {ConfigHelper_getMetaDataConfig} from "../../../helpers/ConfigHelper";
import _ from "lodash"
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import {UtilsHelper_convertToInt, UtilsHelper_getDomain, UtilsHelper_getQueryParam} from "../../../helpers/UtilsHelper";
import {WidgetHelper_findWidgetConfig} from "../../../helpers/WidgetHelper";
import {GenericList_getData} from "../../../components/widgets/Lists/GenericList/GenericListGetData";
import {WidgetHelper_calculateOffsetForGenericListPagination} from "../../../helpers/GenericListHelper";

export async function SeoListGridPrevNext(context: AppContext) {
    const actualPageType = context.siteContentType;
    if (actualPageType !== SiteContentType.SiteNode || context.url === '/') {
        return {};
    }
    const containers = context.customData.gridContainers ? context.customData.gridContainers : ["ListExtendedWidgets1", "ListExtendedWidgets2"];

    const foundGenericList = await WidgetHelper_findWidgetConfig(context, {
        module: "genericList_wdg",
        mainSeoList: true
    }, containers);
    if (!foundGenericList) {
        return {};
    }
    const currentPage = parseInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));
    const isAjaxCall = UtilsHelper_getQueryParam('gridLocationWidgetType', context) === 'genericList';
    const isFirstCall = UtilsHelper_getQueryParam('isFirstCall', context) === '1';
    const offset = WidgetHelper_calculateOffsetForGenericListPagination(foundGenericList, currentPage, isAjaxCall, isFirstCall);

    if (offset >= 1000) {
        return {}
    }
    const data = await GenericList_getData(context, '', foundGenericList, {itemParts: []}, currentPage);
    let totalItems = _.get(data, 'data.stories.total', false);
    //FTS limit is 1000
    if (totalItems > 1000) {
        totalItems = 1000;
    }

    const perPageAllItems = UtilsHelper_convertToInt(foundGenericList.perPageAllItems) || UtilsHelper_convertToInt(foundGenericList.paginationElements);
    const pages = Math.ceil(totalItems / perPageAllItems);
    const lastAllowedPage = Math.ceil((1000 - perPageAllItems) / perPageAllItems);
    const lastPage = Math.min(pages, lastAllowedPage);

    const currentUrlPath = _.get(context, 'hatControllerParams.urlWithParsedQuery.path');
    const prevUrl = new URL(UtilsHelper_getDomain() + currentUrlPath);
    prevUrl.searchParams.set('page', `${currentPage - 1}`);

    const nextUrl = new URL(UtilsHelper_getDomain() + currentUrlPath);
    nextUrl.searchParams.set('page', `${currentPage + 1}`);

    var links: any = [];
    if (currentPage != 1) {
        links.push({rel: "prev", href: prevUrl.toString()});
    }
    if (currentPage < lastPage) {
        links.push({rel: "next", href: nextUrl.toString()});
    }

    return {
        extend: {
            link: links,
        },
    };

}


