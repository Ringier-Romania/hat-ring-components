"use server";
import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {StoryContentSwitcher} from "./StoryContentSwitcher";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryContentParams} from "./types";
import {UtilsHelper} from "../../../../helpers/UtilsHelper";

export async function StoryContent({widgetConfig, context}: StoryContentParams) {
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
                        ... on PreformattedBlock {
                            text
                            type
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
    const content = _.get(response, 'data.story.content[0].blocks');
    return <div className="StoryContent">
        {/* @ts-expect-error Server Component */}
        <StoryContentSwitcher content={content} widgetConfig={widgetConfig} context={context}/>
    </div>
}

