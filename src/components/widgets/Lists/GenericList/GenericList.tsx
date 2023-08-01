import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import * as ItemParts from "./itemParts";
import {GenericListParams, GenericListResponse} from "./types";
import Header from "./generalParts/Header";
import Items from "./generalParts/Items";
import {WidgetHelper_getWidgetCssClasses, WidgetHelper_renderEmptyComponent} from "../../../../helpers/WidgetHelper";

import styles from "../../../../../styles/widgets/Lists/GenericList.module.scss";
import Pagination from "./generalParts/Pagination";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import * as GeneralParts from "../../Lists/GenericList/generalParts";
import {GenericList_getData} from "./GenericListGetData";
import {GenericListMetaTags} from "./GenericListMetaTags";


export async function GenericList({widgetConfig, context, extendableAttributes = {}}: GenericListParams) {

    const currentPage = parseInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));

    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await GenericList_getData(context, queryFragment, widgetConfig, extendableAttributes, currentPage) as GenericListResponse;

    const generalComponents = widgetConfig.generalShowOptions && widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return WidgetHelper_renderEmptyComponent(showOption, 'not supported, yet');
        }
        return <Component key={index} context={context} widgetConfig={widgetConfig} response={response}
                          extendableAttributes={extendableAttributes} currentPage={currentPage}/>;
    });

    let cssModules = styles.GenericList;

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(styles.GenericList) || styles.GenericList;
    }

    function render() {
        return <div suppressHydrationWarning={true}
                    className={WidgetHelper_getWidgetCssClasses('GenericList', widgetConfig, context, [cssModules])}>
            {generalComponents}
            <GenericListMetaTags context={context}/>
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(cssModules);
    }

    return render();
}

