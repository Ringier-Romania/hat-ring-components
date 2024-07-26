import {SeoHelper_currentTitle} from "@hatRingHelpers/seo/SeoHelper";
import {AppContext} from "@hatTypes/types";

export async function SeoMetaTitle(context: AppContext) {
    return {title: await SeoHelper_currentTitle(context, 'meta-title')};
}
