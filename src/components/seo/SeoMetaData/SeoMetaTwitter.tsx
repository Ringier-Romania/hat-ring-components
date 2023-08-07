import React from "react";
import {SeoHelper_currentDescription, SeoHelper_currentTitle} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export async function SeoMetaTwitter(context: AppContext) {
    return {
        twitter: {
            title: await SeoHelper_currentTitle(context, 'twitter-title'),
            description: await SeoHelper_currentDescription(context, 'twitter-description'),
        }
    };
}
