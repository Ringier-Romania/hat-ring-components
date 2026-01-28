import { AppContext } from "../../types/types";
import { ConfigHelper_getContentLinksConfig } from "../ConfigHelper";

interface WhitelistedDomain {
    domain: string;
    relAttribute?: string;
}

interface ContentLinksConfig {
    enableDomainWhitelist?: boolean;
    whitelistedDomains?: WhitelistedDomain[];
}

const LINK_REGEX = /<a\s+[^>]*?href=["'](https?:\/\/[^"']+)["'][^>]*?>/gi;
const REL_REGEX = /\s+rel=["']([^"']*)["']/i;

export async function SeoLinkWhitelistHelper_processLinks(context: AppContext, text: string): Promise<string> {
    if (!text) {
        return text;
    }

    try {
        const contentLinksConfig = await ConfigHelper_getContentLinksConfig(context) as ContentLinksConfig;
        const whitelistedDomainsList = contentLinksConfig?.whitelistedDomains;

        if (!contentLinksConfig?.enableDomainWhitelist || !whitelistedDomainsList?.length) {
            return text;
        }

        const whitelistedDomains = whitelistedDomainsList
            .filter((item) => item.domain?.trim())
            .map((item) => ({
                ...item,
                domain: item.domain.trim().toLowerCase()
            }));

        if (whitelistedDomains.length === 0) {
            return text;
        }

        return text.replace(LINK_REGEX, (matchedLink, href) => {
            let domain: string;
            try {
                domain = new URL(href).hostname.toLowerCase();
            } catch {
                return matchedLink;
            }

            const matchWithWhitelist = whitelistedDomains.find((item) =>
                domain === item.domain || domain.endsWith(`.${item.domain}`)
            );

            const existingRelMatch = matchedLink.match(REL_REGEX);
            const currentRelAttributes = existingRelMatch?.[1]
                ? existingRelMatch[1].split(/\s+/).filter(Boolean)
                : [];

            if (matchWithWhitelist) {
                // Remove nofollow for whitelisted domains
                const filtered = currentRelAttributes.filter((attr) => attr !== "nofollow");

                // Add configured rel attributes
                if (matchWithWhitelist.relAttribute) {
                    const configAttrs = matchWithWhitelist.relAttribute.toLowerCase().split(/\s+/).filter(Boolean);
                    configAttrs.forEach((attr) => {
                        if (!filtered.includes(attr)) {
                            filtered.push(attr);
                        }
                    });
                }
                currentRelAttributes.length = 0;
                currentRelAttributes.push(...filtered);
            } else {
                // Add nofollow for non-whitelisted domains
                if (!currentRelAttributes.includes("nofollow")) {
                    currentRelAttributes.push("nofollow");
                }
            }

            const newRelString = currentRelAttributes.length > 0
                ? ` rel="${currentRelAttributes.join(" ")}"`
                : "";

            if (existingRelMatch) {
                return matchedLink.replace(REL_REGEX, newRelString);
            }

            if (newRelString) {
                return matchedLink.slice(0, -1) + newRelString + ">";
            }

            return matchedLink;
        });
    } catch (error) {
        console.error("SeoLinkWhitelistHelper: Error processing links", error);
        return text;
    }
}
