import React from "react";
import {AppContext, SiteContentType} from "../../../types/types";
import {ConfigHelper_getMetaDataConfig} from "../../../helpers/ConfigHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

type StoryDataResponse = {
    "data": {
        "story"?: {
            "flags"?: Array<{
                "code"
            }>
        }
    }
}
export async function SeoMetaRobots(context: AppContext) {
    const actualPageType = context.siteContentType;
    const robots: any = {};
    let isHiddenFlag = false;

    if (actualPageType === SiteContentType.Story) {
        const query = gql`
            query($storyId: UUID){
                story(id:$storyId){
                    flags {
                        code
                    }
                }
            }
        `;

        const variables = {
            storyId: context.id,
        };

        const response = await WebsiteApiProvider.call(query, variables) as StoryDataResponse;
        isHiddenFlag = response.data.story?.flags?.some((flag) => {
            return flag.code === 'hidden'
        }) || false;
    }

    if (isHiddenFlag) {
        robots.index = false;
        robots.follow = false;
    } else {
        robots.index = true;
        robots.follow = true;
    }

    if (actualPageType === SiteContentType.Search) {
        robots.index = false;
        robots.follow = true;
    }

    return {
        nofollow: !robots.follow,
        noindex: !robots.index,
    };
}


