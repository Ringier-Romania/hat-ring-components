import {ComponentParams} from "../../types/types";
import {gql} from "graphql-tag";
import React from "react";
import * as _ from "lodash";
import {Container} from "./Container";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";
import {UtilsHelper_isDevelopmentMode} from "../../helpers/UtilsHelper";

export interface GridParams extends ComponentParams {
    config: {
        containers: string[],
        boxes?: string[],
    }
}

export async function Grid(params: GridParams) {
    const variant = process.env.NEXT_PUBLIC_WEBSITE_API_VARIANT;
    const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

    let boxes = ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom'];
    if (params.config.boxes) {
        boxes = params.config.boxes;
    }

    let variablesQuery = '';
    let configQuery = '';
    params.config.containers.forEach(section => {
        configQuery += section + ':config(codeName: "' + section + '"){ data } ';
    })

    const antycache = UtilsHelper_isDevelopmentMode() ? `antycacheStatusCode${new Date().getTime()}`: 'antycacheStatusCode';
    const query = gql`
        query($url: URL!, $variant:ID!){
            site(url:$url, variantId: $variant){
                ${antycache}:statusCode
                data {
                    node {
                        config {
                            ${configQuery}
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        url: domain + params.context.url,
        variant: variant,
    };

    const response = await WebsiteApiProvider.call(query, variables);
    console.log(JSON.stringify(response));
    const sectionsConfig = _.get(response, 'data.site.data.node.config');

    return params.config.containers.map(
        sectionName => <Container
            context={params.context}
            boxes={boxes}
            sectionName={sectionName}
            sectionConfig={_.get(sectionsConfig, `${sectionName}.0.data`)}
        />);
}
