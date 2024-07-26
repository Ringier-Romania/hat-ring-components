// Libraries
import React from 'react';

//Types
import {AppContext} from "@hatTypes/types";

// Components
import {AlternateLinksFromStory} from "./AlternateLinksFromStory";
import {AlternateLinksFromNode} from "./AlternateLinksFromNode";

// Helpers
import {ConfigHelper_getSeoLanguagesConfig} from "@hatRingHelpers/ConfigHelper";

/**
 * I-Priority - Alternate links from Story publication data/package
 * II-Priority - Fill alternate links via custom links from the node/page configuration
 * @param context
 * @constructor
 */

export type AlternateLinksObject = {
    hrefLang: string,
    href: string
}

export async function AlternateLinks(context: AppContext) {
    const seoConfig = await ConfigHelper_getSeoLanguagesConfig(context);
    let alternateLinks: Array<AlternateLinksObject> = [];

    if (context.siteContentType === "Story") {
        alternateLinks = await AlternateLinksFromStory(context, seoConfig, alternateLinks);
    } else {
        alternateLinks = await AlternateLinksFromNode(context, seoConfig, alternateLinks);
    }
    
    return alternateLinks;
}
