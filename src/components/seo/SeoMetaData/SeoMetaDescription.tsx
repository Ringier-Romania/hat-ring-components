import {SeoHelper_currentDescription} from "../../../helpers/seo/SeoHelper";
import {AppContext} from "../../../types/types";

export function SeoMetaDescription(context: AppContext) {

    return {description:  SeoHelper_currentDescription()};
}