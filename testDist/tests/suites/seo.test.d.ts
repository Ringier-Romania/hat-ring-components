import { PlaywrightTest } from "../types.js";
import type { Page } from "playwright/test";
export declare function TestSeo_pageTitle({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): Promise<void>;
export declare function TestSeo_pageDescription({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): Promise<void>;
export declare function TestSeo_pageRobots({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): Promise<void>;
export declare function TestSeo_canonical({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): Promise<void>;
export declare function TestSeo_htmlLangAttribute({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): Promise<void>;
export declare function TestSeo_schemaOrg({ page, playwrightTest, expectedValue, compareMode }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue: any;
    compareMode?: 'exact' | 'contains';
}): Promise<void>;
export declare function TestSeo_imageAlts({ page, playwrightTest, imageSrcToSkip }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    imageSrcToSkip?: string[];
}): Promise<void>;
export declare function TestSeo_paginationLinks({ page, playwrightTest, expectedValue }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    expectedValue: {
        next?: string;
        prev?: string;
    };
}): Promise<void>;
