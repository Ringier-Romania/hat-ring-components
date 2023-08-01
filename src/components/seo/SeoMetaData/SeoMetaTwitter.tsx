import React from "react";
import {SeoHelper_currentDescription, SeoHelper_currentTitle} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export function SeoMetaTwitter(context: AppContext) {

    return {
        twitter: {
            title: SeoHelper_currentTitle(),
            description: SeoHelper_currentDescription(),
        }
    };
}
