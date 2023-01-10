import React from "react";
import {BasicWidgetParams, BasicWidgetResponse} from "./types";
import {gql} from "graphql-tag";
import {WebsitesApiClient} from "@ringpublishing/graphql-api-client";
import * as GeneralParts from './generalParts';
import * as _ from 'lodash';
import styles from "../../../../../styles/widgets/common/BasicWidget.module.scss";


export async function BasicWidget({widgetConfig, context}: BasicWidgetParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

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

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query, variables) as BasicWidgetResponse;

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
