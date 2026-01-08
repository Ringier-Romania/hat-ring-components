import { PlaywrightTest } from "../types.js";
export declare function SeoTest_pageTitle(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function SeoTest_pageDescription(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function SeoTest_pageRobots(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function SeoTest_canonical(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function SeoTest_htmlLangAttribute(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function SeoTest_schemaOrg(playwrightTest: PlaywrightTest, expectedValue: any, compareMode?: 'exact' | 'contains'): void;
export declare function SeoTest_imageAlts(playwrightTest: PlaywrightTest): void;
export declare function SeoTest_paginationLinks(playwrightTest: PlaywrightTest, expectedValue: {
    next?: string;
    prev?: string;
}): void;
