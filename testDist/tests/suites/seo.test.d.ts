import { PlaywrightTest } from "../types.js";
export declare function TestSeo_pageTitle({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): void;
export declare function TestSeo_pageDescription({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): void;
export declare function TestSeo_pageRobots({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): void;
export declare function TestSeo_canonical({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): void;
export declare function TestSeo_htmlLangAttribute({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue?: string;
}): void;
export declare function TestSeo_schemaOrg({ playwrightTest, expectedValue, compareMode }: {
    playwrightTest: PlaywrightTest;
    expectedValue: any;
    compareMode?: 'exact' | 'contains';
}): void;
export declare function TestSeo_imageAlts({ playwrightTest, imageSrcToSkip }: {
    playwrightTest: PlaywrightTest;
    imageSrcToSkip?: string[];
}): void;
export declare function TestSeo_paginationLinks({ playwrightTest, expectedValue }: {
    playwrightTest: PlaywrightTest;
    expectedValue: {
        next?: string;
        prev?: string;
    };
}): void;
