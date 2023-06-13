import React from 'react';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryTaxonomyListParams, StoryTaxonomyListResponse} from "./types";
import {RingLink} from "../../../common/RingLink";

export async function StoryTaxonomyList({widgetConfig, context}: StoryTaxonomyListParams) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                topics{
                    topic {
                        id
                        nodeReference {
                            node {
                                breadcrumbs {
                                    url
                                }
                            }
                        }
                        kind {
                            code
                        }
                        name
                        publicationPoint {
                            url
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        storyId: context.id,
    };

    const response = await WebsiteApiProvider.call(query, variables) as StoryTaxonomyListResponse;

    console.log(JSON.stringify(response));
    return <div className={['StoryTaxonomyList'].join(' ')}>
        {widgetConfig.listPrefix && <span className={'listPrefix'}>{widgetConfig.listPrefix}</span>}

        {response.data.story?.topics?.map(topic => {
                if (widgetConfig.taxonomyKind && topic.topic.kind.code != widgetConfig.taxonomyKind) {
                    return null;
                }
                if(widgetConfig.excludedUuids){
                    const excludedUuids = widgetConfig.excludedUuids.split(',');
                    if(excludedUuids.includes(topic.topic.id)){
                        return null;
                    }
                }
                let breadcrumbUrl = topic.topic?.nodeReference?.node.breadcrumbs[topic.topic?.nodeReference?.node.breadcrumbs.length - 1];
                let url = breadcrumbUrl ? breadcrumbUrl.url : null || topic.topic?.publicationPoint?.url;
                return url && widgetConfig.links ?
                    <RingLink href={url}>
                        <span className={'topic'}>{topic.topic.name}</span>
                    </RingLink> : <span className={'topic'}>{topic.topic.name}</span>
            }
        )}

    </div>
}

