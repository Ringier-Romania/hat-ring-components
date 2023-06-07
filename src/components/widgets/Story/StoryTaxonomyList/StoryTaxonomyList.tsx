import React from 'react';
import {gql} from 'graphql-tag';
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryTaxonomyListParams} from "./types";

export async function StoryTaxonomyList({widgetConfig, context}: StoryTaxonomyListParams) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                topics{
                    topic {
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

    const response = await WebsiteApiProvider.call(query, variables);
    return <div className={['StoryTaxonomyList'].join(' ')}>
        {widgetConfig.listPrefix && <span className={'listPrefix'}>{widgetConfig.listPrefix}</span> }


    </div>
}

