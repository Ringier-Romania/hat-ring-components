import {Author} from '@ringpublishing/graphql-api-client/lib/types/websites-api';
import React from 'react';
import {AppContext} from "../../../../types/types";
import {StoryAuthorsWidgetConfig} from "./types";
import * as _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../helpers/WidgetHelper";
import * as Parts from "../StoryAuthors/parts";


export async function StoryAuthor({author, context, widgetConfig}: {
    author: Author,
    context: AppContext,
    widgetConfig: StoryAuthorsWidgetConfig
}) {

    if(!author){
        return  null;
    }
    return <div className="StoryAuthor">
        {widgetConfig.showOptions?.map((showOption, index) => {
            const Component = Parts[_.upperFirst(showOption)];
            if (!Component) {
                console.error(`No general show option name support ${showOption}`);
                return WidgetHelper_renderEmptyComponent(showOption, 'not supported, yet');
            }
            return <Component key={index} context={context} widgetConfig={widgetConfig} author={author}/>;
        })}

    </div>
}

