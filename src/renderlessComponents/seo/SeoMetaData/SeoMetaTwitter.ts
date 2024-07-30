import React from "react";
import {SeoHelper_currentDescription, SeoHelper_currentTitle} from "@hatRingHelpers/seo/SeoHelper";
import {AppContext} from "@hatTypes/types";

export async function SeoMetaTwitter(context: AppContext) {
    return {
        twitter: {
            card: 'summary',
            title: await SeoHelper_currentTitle(context, 'twitter-title'),
            description: await SeoHelper_currentDescription(context, 'twitter-description'),
        }
    };
}
