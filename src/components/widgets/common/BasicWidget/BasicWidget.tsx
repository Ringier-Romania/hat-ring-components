import React from "react";
import {BasicWidgetParams, BasicWidgetResponse} from "./types";
import {gql} from "graphql-tag";
import * as GeneralParts from './generalParts';
import * as _ from 'lodash';
import styles from "../../../../../styles/widgets/common/BasicWidget.module.scss";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {renderEmptyComponent, renderEmptyWidget, shouldHideWidget} from "../../../../helpers";
import * as ItemParts from "./itemParts";


export async function BasicWidget({widgetConfig, context, extendableAttributes = {}}: BasicWidgetParams) {
    if (shouldHideWidget(widgetConfig, context)) {
        return renderEmptyWidget(widgetConfig);
    }

    async function getData(queryNodeFragment) {
        let dynamicVariablesTypes = {}
        let dynamicVariables = {}
        let dynamicFragmentsTitles = '';

        const dynamicFragments = widgetConfig.showOptions.map((showOption) => {
            const allItemParts = context.customData.itemParts || ItemParts;

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
                    dynamicFragmentsTitles += ` ...${fragment.query.definitions[0].name.value} \n`;
                    return `${fragment.query.loc?.source.body}`
                }
            }
        }).join('\n');

        const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
            return `, ${key}: ${dynamicVariablesTypes[key]}`;
        }).join(' ')

        const query = gql`
            query($codeName:  ID!, $nodeId:  ID!, $first: Int ${mappedDynamicVariablesTypes}){
                section(codeName: $codeName, nodeId: $nodeId) {
                    items(first: $first) {
                        edges {
                            node {
                                url
                                ${dynamicFragmentsTitles}
                                ${queryNodeFragment}
                            }
                        }
                    }
                }
            }
            ${dynamicFragments}
        `;

        const variables = {
            ...dynamicVariables,
            codeName: widgetConfig.section_name,
            nodeId: context.hatControllerParams.gqlResponse.data.site.data.node.id,
            // there is no offset for sections so:
            // we have to sum offset + count and delete offset items from response object
            first: (Number(widgetConfig.offset) + Number(widgetConfig.count)) || null
        };

        return await WebsiteApiProvider.call(query, variables);
    }

    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    context.customData.itemParts = extendableAttributes.itemParts;

    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';

    const response = await getData(queryFragment) as BasicWidgetResponse;

    if (response?.data?.section?.items?.edges) {
        response.data.section.items.edges = response.data.section.items.edges.slice(Number(widgetConfig.offset));
    }

    const hideWhenNoItems = widgetConfig.additionalOptions.includes("Hide when no section items");
    if (hideWhenNoItems && _.get(response, 'data.section.items.edges.length', 0) === 0) {
        return renderEmptyWidget(widgetConfig);
    }

    const generalComponents = widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return renderEmptyComponent(showOption, 'not supported, yet');
        }
        return <Component key={index} context={context} widgetConfig={widgetConfig} response={response}/>;
    });

    let cssModules = styles.BasicWidget;

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(styles.BasicWidget) || styles.BasicWidget;
    }

    function render() {
        return <div className={['BasicWidget', cssModules, widgetConfig.customClass || ''].join(' ')}>
            {generalComponents}
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(generalComponents, cssModules);
    }

    return render();
}
