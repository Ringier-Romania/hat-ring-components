import {AlternateLinks} from "../AlternateLinks/AlternateLinks";

export async function SeoMetaAlternates(context) {
    return {languageAlternates: await AlternateLinks(context)};
}
