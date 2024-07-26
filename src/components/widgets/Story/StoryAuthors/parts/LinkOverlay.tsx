import React from 'react';
import {AppContext} from "@hatTypes/types";
import {WidgetHelper_renderEmptyComponent} from "@hatRingHelpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {RingLink} from "@common/RingLink/RingLink";

export default function LinkOverlay(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    return (
        <div className={['LinkOverlay'].join(' ')}>
            {author.publicationPoint?.url ?
                <RingLink href={author.publicationPoint?.url || '#'} title={author.name}>

                </RingLink>
                : null}
        </div>
    )
}

