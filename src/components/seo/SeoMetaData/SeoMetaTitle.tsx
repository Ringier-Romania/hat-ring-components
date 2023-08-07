import React from "react";
import {SeoHelper_currentTitle} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export async function SeoMetaTitle(context: AppContext) {
    return {title: await SeoHelper_currentTitle(context, 'meta-title')};
}
