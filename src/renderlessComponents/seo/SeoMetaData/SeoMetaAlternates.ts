import {AlternateLinks} from "../AlternateLinks/AlternateLinks";

export async function SeoMetaAlternates(context) {
    return {alternates: await AlternateLinks(context)};
}
