import React from "react";
import {SeoHelper_currentTitle} from "@hatRingHelpers/seo/SeoHelper";
import {AppContext} from "@hatTypes/types";
import {UtilsHelper_getDomain} from "@hatRingHelpers/UtilsHelper";

export async function SeoMetaBase(context: AppContext):Promise<any> {
    return {metadataBase: new URL(UtilsHelper_getDomain() + '')};
}
