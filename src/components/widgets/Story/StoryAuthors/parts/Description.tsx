import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {StoryContentSwitcher} from "../../StoryContent/StoryContentSwitcher";
import _ from "lodash";

export default function Description(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    const content = _.get(author,'description.content.0.blocks',[]);
    return (
        <div className={['Description'].join(' ')}>
            {/* @ts-expect-error Server Component */}
            <StoryContentSwitcher content={content} widgetConfig={widgetConfig} context={context}/>
        </div>
    )
}

