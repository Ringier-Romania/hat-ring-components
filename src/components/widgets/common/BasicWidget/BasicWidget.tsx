import React from "react";
import {BasicWidgetParams, BasicWidgetResponse} from "./types";
import {gql} from "graphql-tag";
import * as GeneralParts from './generalParts';
import * as _ from 'lodash';
// @TODO alias
import styles from "../../../../../styles/widgets/common/BasicWidget.module.scss";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {renderEmptyComponent, renderEmptyWidget, shouldHideWidget} from "@helpers"


export async function BasicWidget({widgetConfig, context, extendableAttributes = {}}: BasicWidgetParams) {
    if (shouldHideWidget(widgetConfig, context)) {
        return renderEmptyWidget(widgetConfig);
    }

    async function getData(queryNodeFragment) {
        const query = gql`
            query($codeName:  ID!, $nodeId:  ID!, $first: Int, $bigImageWidth: Int!, $bigImageHeight: Int!, $imageWidth: Int!, $imageHeight: Int!){
                section(codeName: $codeName, nodeId: $nodeId) { 
                    items(first: $first){
                        edges {
                            node {
                                title
                                lead
                                image {
                                    bigImageUrl: url(transforms:{resizeCropAuto:{width:$bigImageWidth,height:$bigImageHeight}} ),
                                    url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}} ),
                                    caption
                                }
                                authors {
                                    name
                                }
                                url
                                creationTime
                                modificationTime
                                originalContent {
                                    ... on Story {
                                        image {
                                            bigImageUrl: url(transforms:{resizeCropAuto:{width:$bigImageWidth,height:$bigImageHeight}} ),
                                            url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}} ),
                                            caption
                                        }
                                        date {
                                            modificationTime
                                            creationTime
                                        }
                                        authors {
                                            author {
                                                name
                                                image {
                                                    url
                                                    caption
                                                }
                                            }
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

        const bigImageDimensions = (widgetConfig.bigImageSize || '0x0').split('x');
        const imageDimensions = (widgetConfig.standardImageSize || '0x0').split('x');

        const variables = {
            codeName: widgetConfig.section_name,
            nodeId: context.hatControllerParams.gqlResponse.data.site.data.node.id,
            // there is no offset for sections so:
            // we have to sum offset + count and delete offset items from response object
            first: (Number(widgetConfig.offset) + Number(widgetConfig.count)) || null,
            bigImageWidth: Number(bigImageDimensions[0]) || 0,
            bigImageHeight: Number(bigImageDimensions[1]) || 0,
            imageWidth: Number(imageDimensions[0]) || 0,
            imageHeight: Number(imageDimensions[1]) || 0
        };

        return await WebsiteApiProvider.call(query, variables);
    }

    let queryFragment = extendableAttributes.getDataQueryNodeFragment || '';
    const response = await getData(queryFragment) as BasicWidgetResponse;

    if (response?.data?.section?.items?.edges) {
        response.data.section.items.edges = response.data.section.items.edges.slice(Number(widgetConfig.offset));
    }

    const hideWhenNoItems = widgetConfig.additionalOptions.includes("Hide when no section items");
    if (hideWhenNoItems && _.get(response, 'data.section.items.edges.length', 0) === 0) {
        return renderEmptyWidget(widgetConfig);
    }

    const allGeneralParts = extendableAttributes.generalParts || GeneralParts;
    context.customData.itemParts = extendableAttributes.itemParts;

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

    function render(){
        return <div className={['BasicWidget', cssModules, widgetConfig.customClass || ''].join(' ')}>
            {generalComponents}
        </div>;
    }

    if (extendableAttributes.render) {
        return extendableAttributes.render(generalComponents, cssModules);
    }

    return render();
}
