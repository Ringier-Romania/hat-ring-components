import React from "react";
import {BasicWidgetParams, BasicWidgetResponse} from "./types";
import {gql} from "graphql-tag";
import * as GeneralParts from './generalParts';
import * as _ from 'lodash';
// @TODO alias
import styles from "../../../../../styles/widgets/common/BasicWidget.module.scss";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";


export async function BasicWidget({widgetConfig, context}: BasicWidgetParams) {
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
                        }
                    }
                }
            }
            
        }
    `;

    const variables = {
        codeName: widgetConfig.section_name,
        nodeId: context.controllerParams.gqlResponse.data.site.data.node.id
    };

    const response = await WebsiteApiProvider.call(query, variables);
    const generalComponents =  widgetConfig.generalShowOptions.map((showOption, index) => {
        const Component = GeneralParts[_.upperFirst(showOption)];
        if (!Component) {
            console.error(`No general show option name support ${showOption}`);
            return <div style={{display: 'none'}}>{showOption} not supported, yet</div>;
        }
        return <Component key={ index } context={context} widgetConfig={ widgetConfig } response={ response }/>;
    })


    return <div className={['BasicWidget', styles.BasicWidget].join(' ')}>
        {generalComponents}
    </div>;
}
