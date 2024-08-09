import React from "react"
import {SeoHelper_storyIsHiddenFlag} from "../../../helpers/seo/SeoHelper"
import {AppContext, SiteContentType} from "../../../types/types"
import {SeoMetaCustomMetaTags} from "./SeoMetaCustomMetaTags"

export async function SeoMetaDecoratorRobots(context: AppContext, generatedMetaTags) {
    const isHiddenFlag = await SeoHelper_storyIsHiddenFlag(context)
    if (isHiddenFlag && generatedMetaTags) {
        generatedMetaTags.extend.meta = generatedMetaTags.extend.meta.filter(
            (tag: {name: string}) => tag.name !== "robots"
        )
        return generatedMetaTags
    }
    if (generatedMetaTags) {
        const nofollow = generatedMetaTags?.nofollow
        const noindex = generatedMetaTags?.noindex
        const customMetaRobotsTags = generatedMetaTags.extend?.meta
            ?.find((tag: {name: string}) => tag.name === "robots")
            ?.content?.split(",")

        if (customMetaRobotsTags) {
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
