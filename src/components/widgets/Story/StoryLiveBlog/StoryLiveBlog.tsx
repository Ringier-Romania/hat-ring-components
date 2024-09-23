
import React from 'react';
import _ from 'lodash';
import {gql} from 'graphql-tag';
import {AbstractWidgetConfig, ComponentParams, WidgetParams} from "../../../../types/types";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {ExternalApplication} from "../../common/ExternalApplication";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";

interface StoryLiveBlogParams extends WidgetParams {
    widgetConfig: StoryLiveBlogParamsConfig
}
interface StoryLiveBlogParamsConfig extends AbstractWidgetConfig {
    liveBlogId?: string,
    extensionAppCodeName?: string,
    liveBlogPlatformUrl?: string,
    liveBlogClientId: string,
    liveBlogLanguage: string
}

export async function StoryLiveBlog({widgetConfig, context}: StoryLiveBlogParams) {
    const query = gql`
        query($storyId: UUID,$extType: String){
            story(id:$storyId){
                extensions(type:$extType){
                    data
                }
            }
        }
    `;

    const variables = {
        storyId: context.id,
        extType: widgetConfig.extensionAppCodeName || 'liveblog',
    };

    let liveblogUuid: boolean | string = false;
    if (widgetConfig.liveBlogId) {
        liveblogUuid = widgetConfig.liveBlogId;
    } else {
        const response = await WebsiteApiProvider.call(query, variables);
        liveblogUuid = _.get(response, 'data.story.extensions[0].data.id', false);
    }

    const liveBlogPlatformUrl = widgetConfig.liveBlogPlatformUrl || 'http://client.liveblog.dreamlab.pl';

    if(!liveblogUuid){
        return null;
    }
    let url = `${liveBlogPlatformUrl}/${liveblogUuid},${widgetConfig.liveBlogLanguage},${widgetConfig.liveBlogClientId},liveblog.html`;

    return <div className={WidgetHelper_getWidgetCssClasses('StoryLiveBlog', widgetConfig, context)}>
        {/* @ts-expect-error Server Component */}
        <ExternalApplication widgetConfig={{controllerUrl: url, selector: '[name="block-html-head"]'}}
                             context={context}/>
        {/* @ts-expect-error Server Component */}
        <ExternalApplication widgetConfig={{controllerUrl: url, selector: '[name="block-body-section"]'}}
                             context={context}/>
    </div>
}

