import {AlternateLinks} from "../../widgets/SEO/AlternateLinks/AlternateLinks";

export async function SeoMetaAlternates(context) {
    return {alternates: await AlternateLinks(context)};
}
