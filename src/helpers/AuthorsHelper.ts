import {AppContext} from "../types/types";
import {StoryAuthorsShowOptions} from "../components/widgets/Story/StoryAuthors/types";
import {StoryHelper_getGqlContentFragment} from "./StoryHelper";
import {gql} from "graphql-tag";
import {ImageHelper_getImageDimensionsFromObject} from "./ImageHelper";
import {WebsiteApiProvider} from "../providers/WebsiteApiProvider";
import {AuthorResponse} from "../components/widgets/Author/Author/types";

export const authorGqlFragment = `publicationPoint {
                            url
                        }
                        socialProfiles{
                            url
                            role {
                                code
                            }
                        }
                        name
                        tagline
                        image{
                            image{
                                url
                            }
                            url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}})
                        }
                        gender{
                            name
                        }
                        occupation{
                            position
                            workplace
                            careerStartTime
                        }
                        publisher{
                          name
                          cooperationStartTime
                        }
                        credentials {
                            issuer
                            issueTime
                            name
                            url
                            role {
                                code  
                                name                      
                            }
                        }
                        associations {
                            name                        
                            url
                        }
                        awards {
                            name
                            issueTime
                            issuer
                            url                        
                        } 
                        works{
                            role {
                                code                        
                            }
                            url
                            title
                        } 
                        topics{
                            topic{
                                name
                            }
                        }
                        `;


export async function Author_getData(context: AppContext, widgetConfig) {
    const descriptionFragment = widgetConfig.showOptions?.includes(StoryAuthorsShowOptions.Description) ? `description { ${StoryHelper_getGqlContentFragment()} }` : '';

    const query = gql`
        query($uuid: UUID, $imageWidth:Int!, $imageHeight:Int!){
            author(id:$uuid){
                ${descriptionFragment}
                ${authorGqlFragment}
            }
        }
    `;

    const imageDimensions = ImageHelper_getImageDimensionsFromObject(widgetConfig, context);

    const variables = {
        uuid: context.id,
        imageWidth: imageDimensions.width,
        imageHeight: imageDimensions.height,
    };


    return await WebsiteApiProvider.call(query, variables, widgetConfig.cacheTTL) as AuthorResponse;
}
