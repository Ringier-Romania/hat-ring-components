import {gql} from "graphql-tag";
import {StoryHelper_getGqlContentFragment} from "../../../helpers/StoryHelper";

export const RSSGqlQuery = gql`
    query($categoryId: UUID!, $limit: Int!, $offset: Int!, $excludedFlags: [String!], $excludedCategoryIds: [UUID!]){
        stories(filter:{category: {in: [$categoryId], notIn: $excludedCategoryIds}, flag:{notIn:$excludedFlags}}, limit: $limit, offset: $offset ){
            total
            edges {
                node {
                    title
                    id
                    mainPublicationPoint {
                        url
                    }
                    image {
                        caption
                        url(transforms: {format: {format: PNG}})
                        crop {
                            width
                            height
                        }
                        image {
                            title
                            width
                            height
                            license {
                                note
                            }
                            sources {
                                 source {
                                    name
                                    link {
                                        url
                                    }
                                }
                            }
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
                    ${StoryHelper_getGqlContentFragment()}
                }
            }
        }
    }
`;
