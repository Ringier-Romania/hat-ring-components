import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {StoryAuthorsParams, StoryAuthorsResponse, StoryAuthorsShowOptions} from "./types";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../helpers/ImageHelper";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {StoryAuthor} from "./StoryAuthor";
import styles from "../../../../../styles/widgets/Story/StoryAuthors.module.scss";
import {StoryHelper_getGqlContentFragment} from "../../../../helpers/StoryHelper";

export async function StoryAuthors({widgetConfig, context}: StoryAuthorsParams) {

    const descriptionFragment = widgetConfig.showOptions?.includes(StoryAuthorsShowOptions.Description) ? `description { ${StoryHelper_getGqlContentFragment()} }` : '';

    const query = gql`
        query($storyId: UUID, $imageWidth:Int!, $imageHeight:Int!){
            story(id:$storyId){
                authors {
                    author {
                        ${descriptionFragment}
                        publicationPoint {
                            url
                        }
                        name
                        tagline
                        image{
                            url(transforms:{resizeCropAuto:{width:$imageWidth,height:$imageHeight}})
                        }
                       
                    }
                }
            }
        }
    `;

    const imageDimensions = ImageHelper_getImageDimensionsFromObject(widgetConfig, context);

    const variables = {
        storyId: context.id,
        imageWidth: imageDimensions.width,
        imageHeight: imageDimensions.height,
    };


    let response = widgetConfig?.response;
    if (!response) {
        response = await WebsiteApiProvider.call(query, variables) as StoryAuthorsResponse;
    }

    console.log(JSON.stringify(response));

    const authors: Author[] = _.get(response, 'data.story.authors', []).map(author => author.author);

    let cssModules = styles.StoryAuthors;
    return <div className={WidgetHelper_getWidgetCssClasses('StoryAuthors', widgetConfig, context,[cssModules])}>
        {authors.map(author => {
            {/* @ts-expect-error Server Component */}
            return <StoryAuthor author={author} context={context} widgetConfig={widgetConfig}/>
        })}

    </div>
}

