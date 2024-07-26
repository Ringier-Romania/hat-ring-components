import React from 'react';
import {AppContext} from "@hatTypes/types";
import {WidgetHelper_renderEmptyComponent} from "@hatRingHelpers/WidgetHelper";
import {StoryAuthorsWidgetConfig} from "../types";
import {Author} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {RingLink} from "@common/RingLink/RingLink";

export default function SocialProfiles(
    {context, widgetConfig, author}:
        {
            context: AppContext,
            widgetConfig: StoryAuthorsWidgetConfig,
            author: Author
        }) {

    return (
        <div className={['SocialProfiles'].join(' ')}>
            {author.socialProfiles? author.socialProfiles.map(socialProfile => {
                return <RingLink className={socialProfile.role.code} href={socialProfile.url}>
                    {socialProfile.role.code}
                </RingLink>;
            }) : null}
        </div>
    )
}

