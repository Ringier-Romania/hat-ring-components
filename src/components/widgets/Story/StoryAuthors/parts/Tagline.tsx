import React from 'react';
import {AppContext} from "@hatTypes/types";
import {WidgetHelper_renderEmptyComponent} from "@hatRingHelpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

export default function Tagline(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    return (
        <div className={['Tagline'].join(' ')}>
            {author.tagline}
        </div>
    )
}

