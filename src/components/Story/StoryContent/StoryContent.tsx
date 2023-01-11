import React from 'react';
import * as _ from 'lodash';
import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';
import * as process from "process"

import * as BlocksTypes from './StoryContentBlocks/index'
import {ComponentParams} from "../../../types/types";;

export interface StoryContentParams extends ComponentParams {
    config: {}
}

export async function StoryContent(params: StoryContentParams) {
    const accessKey = process.env.WEBSITE_API_PUBLIC!;
    const secretKey = process.env.WEBSITE_API_SECRET!;
    const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                content {
                    blocks {
                        ... on ImageBlock {
                            type
                            title
                            url
                            alt
                            link {
                                url
                            }
                            image {
                                description
                                title
                                width
                                height
                                sources {
                                    source {
                                        name
                                    }
                                }
                            }
                        }
                        ... on ParagraphBlock {
                            type
                            text
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        storyId: params.context.id,
    };

    const websitesApiClient = new WebsitesApiClient({accessKey, secretKey, spaceUuid});
    const response = await websitesApiClient.query(query, variables);
    const content = _.get(response, 'data.story.content[0].blocks');
    return content.map((block, index) => {
        console.log(`block-#${index} ->`, JSON.stringify(block, null, 4))
        const blockType = block.type ? _.upperFirst(block.type)+'Block' : 'NotHandledBlock';
        const Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];

        return (
            <Block blockData={block} index={`block_${index}`}/>
        );
    })
}

