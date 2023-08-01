import React from 'react';
import {AppContext} from "../../../../types/types";
// import _ from "lodash";
// import {WidgetHelper_findWidgetConfig} from "../../../../helpers/WidgetHelper";
// import {GenericList_getData} from "./GenericListGetData";

export function GenericListMetaTags({context}: {context:AppContext}) {

    // const containers = context.customData.gridContainers ? context.customData.gridContainers : ["ListExtendedWidgets1", "ListExtendedWidgets2"];
    // const foundGenericList = await WidgetHelper_findWidgetConfig(context, {module: "genericList_wdg"}, containers);
    //
    // if (!foundGenericList) {
    //     return {};
    // }
    // const currentPage = parseInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));
    //
    // const data = await GenericList_getData(context, '', foundGenericList, {itemParts: []}, currentPage);
    //
    //
    // const total = _.get(data, 'data.stories.total', false);
    //
    //
    // console.log(total);

    return null;
    return <>
        <link rel="prev" href="/"></link>
    </>
}

