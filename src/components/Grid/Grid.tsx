import {ComponentParams} from "../../types/types";
import {gql} from "graphql-tag";
import {WebsitesApiClient} from "@ringpublishing/graphql-api-client";
import React from "react";
import * as _ from "lodash";
import {Container} from "./Container";


export interface GridParams extends ComponentParams {
    config: {
        containers: string[],
        boxes: string[],
    }
}

export async function Grid(params: GridParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;
    const variant = process.env.WEBSITE_API_VARIANT;
    const domain = process.env.WEBSITE_API_DOMAIN;

    if (!params.config.boxes) {
        params.config.boxes = ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom'];
    }


    let variablesQuery = '';
    let configQuery = '';
    params.config.containers.forEach(section => {
        configQuery += section + ':config(codeName: "' + section + '"){ data } ';
    })


    console.log(variablesQuery);
    const query = gql`
        query($url: URL!, $variant:ID!){
            site(url:$url, variantId: $variant){
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

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query, variables);

    const sectionsConfig = _.get(response, 'data.site.data.node.config');

    return params.config.containers.map(
        sectionName => <Container
            context={params.context}
            boxes={params.config.boxes}
            sectionName={sectionName}
            sectionConfig={_.get(sectionsConfig, `${sectionName}.0.data`)}
        />);
}
