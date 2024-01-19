import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {RingImage} from "../../../../common/RingImage";
import {ImageHelper_getImageDimensionsFromObject} from "../../../../../helpers/ImageHelper";

export default function Image(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    const dimensions = ImageHelper_getImageDimensionsFromObject(widgetConfig, context);

    return (
        <div className={['Image'].join(' ')}>
            {author.image?.url ? <RingImage src={author.image?.url} alt={author.name} width={dimensions.width} height={dimensions.height}/> : null}
        </div>
    )
}

