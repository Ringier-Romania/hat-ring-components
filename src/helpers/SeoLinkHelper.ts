import { AppContext } from "../types/types";
import { ConfigHelper_getContentLinksConfig } from "./ConfigHelper";

export async function SeoLinkHelper_processLinks(context: AppContext, text: string): Promise<string> {
    if (!text) {
        return text;
    }

    try {
        const contentLinksConfig = await ConfigHelper_getContentLinksConfig(context);

        if (!contentLinksConfig?.enableDomainWhitelist) {
            return text;
        }

        const whitelistedDomainsList = contentLinksConfig.whitelistedDomains;

        if (!whitelistedDomainsList?.length) {
            return text;
        }

        const whitelistedDomains = whitelistedDomainsList
            .filter((item) => item.domain && item.domain.trim())
            .map((item) => {
                return { ...item, domain: item.domain.trim().toLowerCase() };
            });

        return text.replace(/<a\s+[^>]*?href=["'](https?:\/\/[^"']+)["'][^>]*?>/gi, (matchedLink, href) => {
            try {
                let domain = "";
                try {
                    const url = new URL(href);
                    domain = url.hostname.toLowerCase();
                } catch (e) {
                    console.error(`SeoLinkHelper: Failed to parse URL "${href}"`, e);
                    return matchedLink;
                }

                const matchWithWhitelist = whitelistedDomains.find((item) => {
                    return domain === item.domain || domain.endsWith("." + item.domain);
                });

                const relRegex = /\s+rel=["']([^"']*)["']/i;
                const existingRelMatch = matchedLink.match(relRegex);
                let currentRelAttributes =
                    existingRelMatch && existingRelMatch[1]
                        ? existingRelMatch[1].split(/\s+/).map((r) => r.trim())
                        : [];

                if (matchWithWhitelist) {
                    currentRelAttributes = currentRelAttributes.filter(
                        (attr) => attr !== "nofollow" && attr !== "noindex"
                    );

                    if (matchWithWhitelist.relAttribute) {
                        const configRelAttributes = matchWithWhitelist.relAttribute.toLowerCase().split(/\s+/);
                        configRelAttributes.forEach((r) => {
                            if (r && !currentRelAttributes.includes(r)) {
                                currentRelAttributes.push(r);
                            }
                        });
                    }
                } else {
                    if (!currentRelAttributes.includes("nofollow")) {
                        currentRelAttributes.push("nofollow");
                    }
                    if (!currentRelAttributes.includes("noindex")) {
                        currentRelAttributes.push("noindex");
                    }
                }

                const newRelString = currentRelAttributes.length > 0 ? ` rel="${currentRelAttributes.join(" ")}"` : "";

                if (existingRelMatch) {
                    return matchedLink.replace(relRegex, newRelString);
                } else {
                    if (newRelString) {
                        return matchedLink.substring(0, matchedLink.length - 1) + newRelString + ">";
                    }
                }

                return matchedLink;
            } catch (innerError) {
                console.error("SeoLinkHelper: Error processing individual link match", innerError);
                return matchedLink;
            }
        });
    } catch (error) {
        console.error("SeoLinkHelper: Global error processing links", error);
        return text;
    }
}
