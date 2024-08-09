import React from "react"

import {AppContext, SiteContentType} from "../../../types/types"
import {SeoMetaCustomMetaTags} from "./SeoMetaCustomMetaTags"
import {SeoHelper_checkStoryHiddenFlag} from "../../../helpers/StoryHelper"
export async function SeoMetaDecoratorRobots(context: AppContext, generatedMetaTags) {
    if (generatedMetaTags) {
        const nofollow = generatedMetaTags?.nofollow
        const noindex = generatedMetaTags?.noindex
        const customMetaRobotsTags = generatedMetaTags.extend?.meta
            ?.find((tag: {name: string}) => tag.name === "robots")
            ?.content?.split(",")
        if (customMetaRobotsTags) {
            const isHiddenFlag = await SeoHelper_checkStoryHiddenFlag(context)
            if (isHiddenFlag) {
                generatedMetaTags.extend.meta = generatedMetaTags.extend.meta.filter(
                    (tag: {name: string}) => tag.name !== "robots"
                )
                return generatedMetaTags
            }

            const customSettings = {
                nofollow: customMetaRobotsTags.includes("nofollow") || !customMetaRobotsTags.includes("follow"),
                noindex: customMetaRobotsTags.includes("noindex") || !customMetaRobotsTags.includes("index"),
            }
            
            generatedMetaTags.nofollow = customSettings.nofollow
            generatedMetaTags.noindex = customSettings.noindex

            if (
                generatedMetaTags.nofollow === customSettings.nofollow &&
                generatedMetaTags.noindex === customSettings.noindex
            ) {
                generatedMetaTags.extend.meta = generatedMetaTags.extend.meta.filter(
                    (tag: {name: string}) => tag.name !== "robots"
                )
            }
        }
    }
    return generatedMetaTags
}
