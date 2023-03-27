"use server";
import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import * as ItemParts from "./itemParts";
import {GenericListParams, GenericListResponse} from "./types";
import Header from "./generalParts/Header";
import Items from "./generalParts/Items";
import {WidgetHelper} from "../../../../helpers/WidgetHelper";

import styles from "../../../../../styles/widgets/common/GenericList.module.scss";
import Pagination from "./generalParts/Pagination";
import {UtilsHelper} from "../../../../helpers/UtilsHelper";


export async function GenericList({widgetConfig, context, extendableAttributes = {}}: GenericListParams) {

    const currentPage = parseInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));

    async function getData(queryNodeFragment) {
        let dynamicVariablesTypes = {}
        let dynamicVariables = {}
        let dynamicFragmentsNames = '';

        const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
            const allItemParts = extendableAttributes.itemParts || ItemParts;

            const ItemPart = allItemParts[_.upperFirst(showOption)];

            if (ItemPart && ItemPart.getFragment) {
                const fragment = ItemPart.getFragment(widgetConfig);
                if (fragment.variables) {
                    dynamicVariables = {...dynamicVariables, ...fragment.variables}
                }

                if (fragment.variablesTypes) {
                    dynamicVariablesTypes = {...dynamicVariablesTypes, ...fragment.variablesTypes}
                }

                if (fragment.query) {
                    dynamicFragmentsNames += ` ...${fragment.query.definitions[0].name.value} \n`;
                    return `${fragment.query.loc?.source.body}`
                }
            }
        }).join('\n');

        const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
            return `, ${key}: ${dynamicVariablesTypes[key]}`;
        }).join(' ');


        const query = gql`
            query($categoryId: UUID!, $limit: Int!, $offset: Int! ${mappedDynamicVariablesTypes}){
                stories(filter:{category: {in: [$categoryId]}},limit: $limit, offset: $offset ){
                    total
                    edges {
                        node {
                            mainPublicationPoint {
                                url
                            }
                            ${dynamicFragmentsNames}
                            ${queryNodeFragment}
                        }
                    }
                }
            }
            ${dynamicFragments}
        `;

        const categoryId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id');

        const offset = (UtilsHelper.convertToInt(widgetConfig.postShift) || 0) + ((currentPage - 1) * UtilsHelper.convertToInt(widgetConfig.paginationElements));
        const variables = {
            ...dynamicVariables,
            categoryId: categoryId,
            limit: UtilsHelper.convertToInt(widgetConfig.paginationElements),
            offset: offset
        };
        return await WebsiteApiProvider.call(query, variables);
    }

    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment) as GenericListResponse;

    let cssModules = styles.GenericList;

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(styles.GenericList) || styles.GenericList;
    }

    function render() {
        return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig, ['GenericList', cssModules])}>
            <Header context={context} widgetConfig={widgetConfig} response={response}/>
            <Items context={context} widgetConfig={widgetConfig} response={response}
                   extendableAttributes={extendableAttributes}/>
            <Pagination context={context} widgetConfig={widgetConfig} response={response} currentPage={currentPage}/>
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(cssModules);
    }

    return render();
}

