import { PlaywrightTest } from "../types.js";
export declare function TestSeo_pageTitle(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function TestSeo_pageDescription(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function TestSeo_pageRobots(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function TestSeo_canonical(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function TestSeo_htmlLangAttribute(playwrightTest: PlaywrightTest, expectedValue: string): void;
export declare function TestSeo_schemaOrg(playwrightTest: PlaywrightTest, expectedValue: any, compareMode?: 'exact' | 'contains'): void;
export declare function TestSeo_imageAlts(playwrightTest: PlaywrightTest, imageSrcToSkip?: string[]): void;
export declare function TestSeo_paginationLinks(playwrightTest: PlaywrightTest, expectedValue: {
    next?: string;
    prev?: string;
}): void;
