import React from "react";
import {AppContext, SiteContentType} from "../../../types/types";
import {ConfigHelper_getMetaDataConfig} from "../../../helpers/ConfigHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import { SeoHelper_checkStoryHiddenFlag } from "../../../helpers/StoryHelper"

export async function SeoMetaRobots(context: AppContext) {
    const actualPageType = context.siteContentType;
    const robots: any = {};
    let isHiddenFlag = false;

    if (actualPageType === SiteContentType.Story) {
       isHiddenFlag = await SeoHelper_checkStoryHiddenFlag(context)
    }

    if (isHiddenFlag) {
        robots.index = false;
        robots.follow = false;
    } else {
        robots.index = true;
        robots.follow = true;
    }

    if (actualPageType === SiteContentType.Search || actualPageType === SiteContentType.Error404) {
        robots.index = false
        robots.follow = true
    }    
    return {
        nofollow: !robots.follow,
        noindex: !robots.index,
    };
}


