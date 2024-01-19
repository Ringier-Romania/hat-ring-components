import React from 'react';
import * as _ from 'lodash';
import {gql} from 'graphql-tag';
import {StoryContentSwitcher} from "./StoryContentSwitcher";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {StoryContentParams} from "./types";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {StoryHelper_getGqlContentFragment} from "../../../../helpers/StoryHelper";

export async function StoryContent({widgetConfig, context, extendableAttributes = {}}: StoryContentParams) {

    async function getData(queryStoryFragment) {
        const query = gql`
            query($storyId: UUID){
                story(id:$storyId){
                    ${StoryHelper_getGqlContentFragment()}
                    ${queryStoryFragment}
                }
            }
        `;
        const variables = {
            storyId: context.id,
        };

        const response = await WebsiteApiProvider.call(query, variables);
        return _.get(response, 'data.story.content[0].blocks');
    }

    let queryFragment = extendableAttributes?.getDataQueryStoryFragment || '';
    const content = await getData(queryFragment);

    let cssModules = '';

    if (extendableAttributes.getCssModule) {
        cssModules = extendableAttributes.getCssModule(cssModules) || '';
    }

    function render() {
        return <div className={WidgetHelper_getWidgetCssClasses('StoryContent',widgetConfig, context)}>
            {/* @ts-expect-error Server Component */}
            <StoryContentSwitcher content={content} widgetConfig={widgetConfig} context={context} extendableAttributes={extendableAttributes}/>
        </div>
    };

    if (extendableAttributes.render) {
        return extendableAttributes.render(cssModules);
    }

    return render();
}

