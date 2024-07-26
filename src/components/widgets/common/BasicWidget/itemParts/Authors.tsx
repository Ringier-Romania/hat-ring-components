import React from 'react';
import {AppContext} from "@hatTypes/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import {RingImage} from "@common/RingImage";
import {WidgetHelper_renderEmptyComponent} from "@hatRingHelpers/WidgetHelper";
import gql from "graphql-tag";
import {TransformType} from "@hatRingHelpers/AcceleratorImagesHelper";

export default function Authors(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {
    const authorsObjs = data.authors?.map((name) => {return {name, image: {url: null, caption: null}}}) || data.originalContent?.authors?.map((obj) => obj.author);

    if (!authorsObjs || authorsObjs.length === 0) {
        return WidgetHelper_renderEmptyComponent('Authors','', true);
    }

    return (
        <div className={['Authors'].join(' ')}>
            {authorsObjs.map((author, index) => (
                <div className="authorWrapper" key={index}>
                    {author.image?.url &&
                        <div className="authorImage">
                            <RingImage src={author.image.url} alt={author.image.caption || author.name} width={100} height={100} transform={TransformType.ResizeCropAuto} />
                        </div>
                    }
                    {author.name &&
                        <div className="authorName">
                            {author.name}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

Authors.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment AuthorsFragment on SectionItem {
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



