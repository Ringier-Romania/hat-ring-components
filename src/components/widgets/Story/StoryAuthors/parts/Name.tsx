import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

export default function Name(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    return (
        <div className={['Name'].join(' ')}>
            {author.name}
        </div>
    )
}

