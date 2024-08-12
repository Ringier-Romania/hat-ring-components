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

    if (customMetaRobotsTags && customMetaRobotsTags.length > 0) {
        const isHiddenFlag = await SeoHelper_checkStoryHiddenFlag(context)
        if (isHiddenFlag) {
            generatedMetaTags.nofollow = true
            generatedMetaTags.noindex = true
            generatedMetaTags.extend.meta = removeRobotsTag(generatedMetaTags.extend.meta)
            return generatedMetaTags
        }

        const customSettings = {
            nofollow: customMetaRobotsTags.includes("nofollow"),
            noindex: customMetaRobotsTags.includes("noindex"),
        }

        generatedMetaTags.nofollow = customSettings.nofollow
        generatedMetaTags.noindex = customSettings.noindex

        generatedMetaTags.extend.meta = removeRobotsTag(generatedMetaTags.extend.meta)
    }
    return generatedMetaTags
}
