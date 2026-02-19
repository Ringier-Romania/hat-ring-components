import { PlaywrightTest } from "../types";
import type { Page } from "playwright/test";
export declare function TestSocialMedia_openGraphAndTwitterCards({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue: {
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
        ogUrl?: string;
        ogType?: string;
        ogSiteName?: string;
        ogImageUrl?: string;
        ogImageSecureUrl?: string;
        ogImageType?: string;
        ogImageWidth?: string;
        ogImageHeight?: string;
        ogLocale?: string;
        twitterCard?: string;
        twitterTitle?: string;
        twitterDescription?: string;
    };
}): Promise<void>;
