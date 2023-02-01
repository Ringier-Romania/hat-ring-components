import React from "react";
import {BasicWidgetParams, BasicWidgetResponse} from "./types";
import {gql} from "graphql-tag";
import * as GeneralParts from './generalParts';
import * as _ from 'lodash';
// @TODO alias
import styles from "../../../../../styles/widgets/common/BasicWidget.module.scss";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";


export async function BasicWidget({widgetConfig, context, extendableAttributes = {}}: BasicWidgetParams) {
    async function getData(queryNodeFragment) {
        const query = gql`
            query($codeName:  ID!, $nodeId:  ID!){
                section(codeName: $codeName, nodeId: $nodeId) { 
                    items{
                        edges {
                            node {
                                title
                                lead
                                image {
                                    url,
                                    caption
                                }
                                url
                                originalContent {
                                    ... on Story {
                                        image {
                                            url,
                                            caption
                                        }
                                    }
                                }
                                ${queryNodeFragment}
                            }
                        }
                    }
                }
            }
        `;

        const variables = {
            codeName: widgetConfig.section_name,
            nodeId: context.hatControllerParams.gqlResponse.data.site.data.node.id
        };
        return await WebsiteApiProvider.call(query, variables);
    }

    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment);

    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    context.customData.itemParts = extendableAttributes.itemParts;

    const generalComponents = widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = allGeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return <div style={{display: 'none'}}>{showOption} not supported, yet</div>;
        }
        return <Component key={index} context={context} widgetConfig={widgetConfig} response={response}/>;
    });

    let cssModules = styles.BasicWidget;

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(styles.BasicWidget) || styles.BasicWidget;
    }

    function render(){
        return <div className={['BasicWidget', cssModules].join(' ')}>
            {generalComponents}
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(generalComponents, cssModules);
    }

    return render();
}
