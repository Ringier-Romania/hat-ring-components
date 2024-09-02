import React from 'react';
import {AppContext, SiteContentType} from "../../../../../types/types";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {UtilsHelper_getCurrentPageType} from "../../../../../helpers/UtilsHelper";

export default function Name(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    const Tag = UtilsHelper_getCurrentPageType(context) === SiteContentType.Author ? 'h1' : 'div';
    return (
        <Tag className={['Name'].join(' ')}>
            {author?.name}
        </Tag>
    )
}

