import {SeoHelper_currentDescription} from "@hatRingHelpers/seo/SeoHelper";
import {AppContext} from "@hatTypes/types";

export async function SeoMetaDescription(context: AppContext) {
    return {description: await SeoHelper_currentDescription(context, 'meta-description')};
}
