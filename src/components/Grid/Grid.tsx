import {ComponentParams} from "../../types/types";
import {gql} from "graphql-tag";
import React from "react";
import * as _ from "lodash";
import {Container} from "./Container";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";
import {UtilsHelper_getDomain, UtilsHelper_isDevelopmentMode} from "../../helpers/UtilsHelper";
import {CacheHelper_get} from "../../helpers/CacheHelper";

export interface GridParams extends ComponentParams {
    config: {
        containers: string[],
        boxes?: string[],
    }
}

export async function Grid(params: GridParams) {
    const variant = params.context.websiteManagerVariant;

    let boxes = ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom'];
    if (params.config.boxes) {
        boxes = params.config.boxes;
    }

    const variables = {
        nodeID: params.context.siteNodeId,
        variant: variant,
    };

    const cacheKey = {variables, boxes, containers: params.config.containers};


    let variablesQuery = '';
    let configQuery = '';
    params.config.containers.forEach(section => {
        configQuery += section + ':config(codeName: "' + section + '"){ data } ';
    })

    const antycache = UtilsHelper_isDevelopmentMode() ? `antycacheStatusCode${new Date().getTime()}` : 'antycacheStatusCode';
    const query = gql`
        query($nodeID: ID!, $variant:ID!){
            node(id: $nodeID){
                config(variantId: $variant){
                    ${antycache}:__typename
                    ${configQuery}
                }
            }
        }
    `;

    let sectionsConfig = false;
    if (CacheHelper_get(cacheKey)) {
        sectionsConfig = CacheHelper_get(cacheKey);
    } else {
        console.log(query.loc?.source.body);
        console.log(JSON.stringify(variables));
        const response = await WebsiteApiProvider.call(query, variables);
        sectionsConfig = _.get(response, 'data.node.config');
    }

    return params.config.containers.map(
        (sectionName, i) => <Container
            context={params.context}
            boxes={boxes}
            sectionName={sectionName}
            sectionConfig={_.get(sectionsConfig, `${sectionName}.0.data`)}
            key={i}
        />);
}
