import React from 'react';
import * as _ from 'lodash';
import {WebsitesApiClient} from '@ringpublishing/graphql-api-client';
import {gql} from 'graphql-tag';
import * as process from "process"

import * as BlocksTypes from './StoryContentBlocks/index'
import {ComponentParams} from "../../../types/types";
import {StoryContentSwitcher} from "./StoryContentSwitcher";

;

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
                        ... on HeadingBlock {
                            type
                            level
                            text
                        }
                        ... on UnorderedListBlock {
                            type
                            styleType
                            entries
                            indentLevel
                        }
                        ... on OrderedListBlock {
                            type
                            styleType
                            entries
                            indentLevel
                            startValue
                        }
                        ... on EmbedBlock {
                            type
                            embed {
                                html
                            }
                        }
                        ... on TableBlock {
                            type
                            rows {
                                cells {
                                    alignment
                                    classes
                                    colspan
                                    isHeader
                                    link {
                                        url
                                    }
                                    rowspan
                                    text
                                }
                            }
                        }
                        ... on GroupBlock {
                            name
                            type
                            alignment
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
    return <div>
        {/* @ts-expect-error Server Component */}
        <StoryContentSwitcher content={content} />
    </div>
}

