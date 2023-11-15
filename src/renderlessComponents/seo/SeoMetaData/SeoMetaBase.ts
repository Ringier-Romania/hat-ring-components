import React from "react";
import {SeoHelper_currentTitle} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";
import {Metadata} from "next";
import {UtilsHelper_getDomain} from "../../../helpers/UtilsHelper";

export async function SeoMetaBase(context: AppContext):Promise<Metadata> {
    return {metadataBase: new URL(UtilsHelper_getDomain() + '')};
}
