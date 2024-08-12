import React from "react"
import {AppContext} from "../../../types/types"
import {SeoHelper_checkStoryHiddenFlag} from "../../../helpers/StoryHelper"

const removeRobotsTag = (metaTags) => {
    return metaTags.filter((tag: {name: string}) => tag.name !== "robots")
}

export async function SeoMetaDecoratorRobots(context: AppContext, generatedMetaTags) {
    if (!generatedMetaTags) {
        return generatedMetaTags
    }

    const customMetaRobotsTags = generatedMetaTags.extend?.meta
        ?.find((tag: {name: string}) => tag.name === "robots")
        ?.content?.split(",")

    if (customMetaRobotsTags) {
        const isHiddenFlag = await SeoHelper_checkStoryHiddenFlag(context)
        if (isHiddenFlag) {
            generatedMetaTags.extend.meta = removeRobotsTag(generatedMetaTags.extend.meta)
            return generatedMetaTags
        }
    }

    const customSettings = {
        nofollow: customMetaRobotsTags.includes("nofollow")
            ? true
            : customMetaRobotsTags.includes("follow")
              ? false
              : null,
        noindex: customMetaRobotsTags.includes("noindex")
            ? true
            : customMetaRobotsTags.includes("index")
              ? false
              : null,
    }

    generatedMetaTags.nofollow = customSettings.nofollow ?? generatedMetaTags.nofollow
    generatedMetaTags.noindex = customSettings.noindex ?? generatedMetaTags.noindex

    if (
        generatedMetaTags.nofollow === customSettings.nofollow &&
        generatedMetaTags.noindex === customSettings.noindex
    ) {
        generatedMetaTags.extend.meta = removeRobotsTag(generatedMetaTags.extend.meta)
    }

    return generatedMetaTags
}
