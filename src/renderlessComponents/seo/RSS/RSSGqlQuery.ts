import {gql} from "graphql-tag";

export const RSSGqlQuery = gql`
    query($categoryId: UUID!, $limit: Int!, $offset: Int!, $excludedFlags: [String!]){
        stories(filter:{category: {in: [$categoryId]}, flag:{notIn:$excludedFlags}}, limit: $limit, offset: $offset ){
            total
            edges {
                node {
                    title
                    id
                    mainPublicationPoint {
                        url
                    }
                    image {
                        url(transforms: {format: {format: PNG}})
                        image {
                            width
                            height
                        }
                    }
                    date {
                        creationTime
                    }
                    authors {
                        author {
                            name
                            socialProfiles{
                                role {
                                    code
                                }
                                url
                            }
                        }
                    }
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
                                entries
                            }
                            ... on OrderedListBlock {
                                type
                                entries
                            }
                            ... on EmbedBlock {
                                type
                                embed {
                                    id
                                    url
                                    params
                                }
                            }
                            ... on TableBlock {
                                type
                                rows {
                                    cells {
                                        isHeader
                                        link {
                                            url
                                        }
                                        rowspan
                                        text
                                    }
                                }
                            }
                            ... on PreformattedBlock {
                                text
                                type
                            }
                        }
                    }
                }
            }
        }
    }
`;
