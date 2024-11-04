import React from "react";
import {AppContext, SiteContentType} from "../../../types/types";
import {ConfigHelper_getMetaDataConfig} from "../../../helpers/ConfigHelper";
import _ from "lodash"
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import {UtilsHelper_convertToInt, UtilsHelper_getDomain} from "../../../helpers/UtilsHelper";
import {WidgetHelper_findWidgetConfig} from "../../../helpers/WidgetHelper";
import {GenericList_getData} from "../../../components/widgets/Lists/GenericList/GenericListGetData";

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
    const data = await GenericList_getData(context, '', foundGenericList, {itemParts: []}, currentPage);
    let totalItems = _.get(data, 'data.stories.total', false);
    //FTS limit is 1000
    if (totalItems > 1000) {
        totalItems = 1000;
    }

    const paginationElements = UtilsHelper_convertToInt(foundGenericList.paginationElements);
    const pages = Math.ceil(totalItems / paginationElements);

    const currentUrlPath = _.get(context, 'hatControllerParams.urlWithParsedQuery.path');
    const prevUrl = new URL(UtilsHelper_getDomain() + currentUrlPath);
    prevUrl.searchParams.set('page', `${currentPage - 1}`);

    const nextUrl = new URL(UtilsHelper_getDomain() + currentUrlPath);
    nextUrl.searchParams.set('page', `${currentPage + 1}`);

    var links: any = [];
    if (currentPage != 1) {
        links.push({rel: "prev", href: prevUrl.toString()});
    }
    if(currentPage < pages) {
        links.push({rel: "next", href: nextUrl.toString()});
    }
    return {
        extend: {
            link: links,
        },
    };
}


