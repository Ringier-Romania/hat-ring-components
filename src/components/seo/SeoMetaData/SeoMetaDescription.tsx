import {SeoHelper_currentDescription} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export async function SeoMetaDescription(context: AppContext) {
    return {description: await SeoHelper_currentDescription(context, 'meta-description')};
}
