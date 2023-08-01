import React from "react";
import {SeoHelper_currentTitle} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export function SeoMetaTitle(context: AppContext) {

    return {title:  SeoHelper_currentTitle()};
}
