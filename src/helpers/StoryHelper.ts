import {ContentBlock, Story} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import * as convert from "xml-js";
import _ from "lodash";
import {UtilsHelper_ensureHttps} from "./UtilsHelper";
import { WebsiteApiProvider } from "../providers/WebsiteApiProvider";
import { gql } from "@ringpublishing/graphql-api-client";

export function StoryHelper_generateContentHtml(story: Story): string {
    let base: any = {}

    base.elements = [];
    story.content[0].blocks.map((block: any, index) => {
        switch (block.type) {
            case "heading":
                base.elements.push({
                    name: `h${block.level}`, type: "element", elements: [{
                        type: "text",
                        text: block.text
                    }]
                });
                break;
            case "paragraph":
                base.elements.push({
                        name: "p", type: "element", elements:
                            [{
                                type: "text",
                                text: block.text
                            }]
                    }
                );
                break;
            case "image":
                const caption = _.get(block, "image.title");
                let figureElements: any[] = [{
                    name: "img", type: "element", attributes: {src: block.url, alt: caption}
                }];
                if (caption) {
                    figureElements.push(
                        {
                            name: "figcaption", type: "element", elements: [{
                                type: "text",
                                text: caption
                            }]
                        }
                    )
                }

                base.elements.push({name: "figure", type: "element", elements: figureElements});
                break;
            case "unorderedList":
            case "orderedList":
                let liElements: any[] = [];
                block.entries.forEach(entry => {
                    liElements.push({
                        name: "li", type: "element", elements: [{type: "text", text: entry}]
                    })
                })
                base.elements.push({
                    name: block.type == "unorderedList" ? "ul" : "ol", type: "element", elements: liElements
                });
                break;
            case "preformatted":
                base.elements.push({
                        name: "pre", type: "element", elements:
                            [{
                                type: "text",
                                text: block.text
                            }]
                    }
                );
                break;
            case "embedded_application":
                if (!block.embed?.url) {
                    break;
                }
                const isDifferentHeight = ['Twitter', 'Instagram', 'postfacebook'].includes(block.embed?.params?.provider);
                base.elements.push({
                        name: "figure",
                        type: "element",
                        attributes: {className: 'op-interactive', align: 'center',},
                        elements:
                            [{
                                name: 'iframe',
                                type: "element",
                                attributes: {
                                    className: 'no-margin',
                                    width: '560',
                                    height: isDifferentHeight ? '450' : '315',
                                    frameborder: '0',
                                    src: UtilsHelper_ensureHttps(block.embed?.url),
                                },
                            }]
                    }
                );
                break;
            case "table":
                let tableElements: any[] = [];
                if (block.rows) {
                    block.rows.forEach(row => {
                        let rowElement = {
                            name: "tr",
                            type: "element",
                            elements: [] as any[],
                        }
                        row.cells.forEach(cell => {
                            rowElement.elements.push({
                                name: cell.isHEader ? "th" : "td",
                                type: "element",
                                attributes: {
                                    rowspan: cell.rowspan ? cell.rowspan : 1
                                },
                                elements: [{type: "text", text: cell.text}],
                            });
                        });
                        tableElements.push(rowElement);
                    })
                }

                base.elements.push({type: "element", elements: tableElements, name: "table"})
                break;
            default:
                console.log(`${block.type} not supported`);
                break;
        }
    });

    return convert.js2xml(base, {compact: false, ignoreComment: true, spaces: 4});
}

export function StoryHelper_getLeadBlock(story: Story): any {
    return _.get(story, 'content.0.blocks.0', null);
}

export function StoryHelper_getGqlContentFragment(): any {
    return `content {
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
                        alignment
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
                            id
                            params
                            html
                            kind {
                                code
                               
                                    
                                }
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
                     ... on SlotBlock{
                        type
                        data
                        kind{
                            code
                        }
                     }
                }
            }`;
}

export function StoryHelper_getGroupContent(storyContentBlocks, groupType: string): any {
    let blocks: any = [];
    let started = false;
    storyContentBlocks.forEach(block => {
        if (block.name === groupType && block.type ==='groupEnd'){
            started = false;
            return false;
        }
        if (started) {
            blocks.push(block);
        }
        if (block.name === groupType && block.type ==='groupStart'){
            started = true;
        }
    });

    return blocks;

}
export async function SeoHelper_checkStoryHiddenFlag(context) {
    const query = gql`
        query ($storyId: UUID) {
            story(id: $storyId) {
                flags {
                    code
                }
            }
        }
    `

    const variables = {
        storyId: context.id,
    }
    const response = await WebsiteApiProvider.call(query, variables)

    let isHiddenFlag =
        response.data?.story?.flags?.some((flag: {code: string}) => {
            return flag.code === "hidden"
        }) || false
    return isHiddenFlag
}