import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage, TransformType} from "../../../../common/RingImage";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

export default function AuthorsImages(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const authorsObjs = data.authors?.map((name) => {return {name, image: {url: null, caption: null}}}) || data.originalContent?.authors?.map((obj) => obj.author);

    if (!authorsObjs || authorsObjs.length === 0) {
        return WidgetHelper.renderEmptyComponent('AuthorsImages');
    }


    return (
        <div className={['AuthorsImages'].join(' ')}>
            {authorsObjs.map((author) => (
                <>
                    {author.image?.url &&
                        <div className="authorImage">
                            <RingImage src={author.image.url} alt={author.image.caption || author.name} width={100} height={100} transform={TransformType.ResizeCropAuto} />
                        </div>
                    }
                </>
            ))}
        </div>
    )
}

AuthorsImages.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment AuthorsImagesFragment on SectionItem {
            authors {
                name
            }
            originalContent {
                ... on Story {
                    authors {
                        author {
                            name
                            image {
                                url
                                caption
                            }
                        }
                    }
                }
            }
        }`
    }
}



