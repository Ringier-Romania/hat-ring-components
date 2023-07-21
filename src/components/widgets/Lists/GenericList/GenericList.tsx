
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
            query($categoryId: UUID!, $limit: Int!, $excludedFlags: [String!], $offset: Int! ${mappedDynamicVariablesTypes}){
                stories(filter:{category: {in: [$categoryId]}, flag: {notIn:$excludedFlags}},limit: $limit, offset: $offset ){
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

        const excludedFlags = widgetConfig.excludedFlags ? widgetConfig.excludedFlags.map(flag => {return flag.excludedFlag }) : null;
        const categoryId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id')|| _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.id');
        const offset = (UtilsHelper_convertToInt(widgetConfig.postShift) || 0) + ((currentPage - 1) * UtilsHelper_convertToInt(widgetConfig.paginationElements));
        const variables = {
            ...dynamicVariables,
            categoryId: categoryId,
            limit: UtilsHelper_convertToInt(widgetConfig.paginationElements),
            offset: offset,
            excludedFlags: excludedFlags,
        };

        return await WebsiteApiProvider.call(query, variables);
    }

    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment) as GenericListResponse;

    const generalComponents = widgetConfig.generalShowOptions && widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return WidgetHelper_renderEmptyComponent(showOption, 'not supported, yet');
        }
        return <Component key={index} context={context} widgetConfig={widgetConfig} response={response} extendableAttributes={extendableAttributes} currentPage={currentPage}/>;
    });

    let cssModules = styles.GenericList;

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(styles.GenericList) || styles.GenericList;
    }

    function render() {
        return <div className={WidgetHelper_getWidgetCssClasses('GenericList', widgetConfig, context, [cssModules])}>
            {generalComponents}
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(cssModules);
    }

    return render();
}

