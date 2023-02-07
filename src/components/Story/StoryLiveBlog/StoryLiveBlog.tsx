import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {ComponentParams} from "../../../types/types";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import {ExternalApplication} from "../../widgets/common/ExternalApplication";


export async function StoryLiveBlog({config, context}: ComponentParams) {
    const variant = process.env.WEBSITE_API_VARIANT;
    const domain = process.env.WEBSITE_DOMAIN;
    const query = gql`
        query($extType: String, $url: URL!, $variant: ID!){
            site(url: $url, variantId: $variant){

                data {
                    node {
                        config {
                            config(codeName: "liveBlog"){ data }
                        }
                    }
                    content {
                        ...on Story{
                            extensions(type:$extType){
                                data
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        extType: 'liveblog',
        url: domain + context.url,
        variant,
    };

    const response = await WebsiteApiProvider.call(query, variables);

    const platformUrl = _.get(response,'data.site.data.node.config.config[0].data.liveBlogPlatformUrl',false);
    const productKey = _.get(response,'data.site.data.node.config.config[0].data.liveBlogClientId',false);
    const productLanguage = _.get(response,'data.site.data.node.config.config[0].data.liveBlogLanguage',false);
    const liveblogUuid = _.get(response,'data.site.data.content.extensions[0].data.id',false);

    if(!(platformUrl && productKey && productLanguage && liveblogUuid)){
        return <div style={{display: 'none'}}>Problem with fetching liveblog data</div>
    }

    let url = `${platformUrl}/${liveblogUuid},${productLanguage},${productKey},liveblog.html`;

    return <div className="StoryLiveBlog">
        {/* @ts-expect-error Server Component */}
        <ExternalApplication widgetConfig={{controllerUrl: url}} context={context}/>
    </div>
}

