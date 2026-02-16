import { Page, Locator } from 'playwright/test';
import { PlaywrightTest } from "../tests/types.js";
export declare function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null>;
export declare function TestsHelper_getStructuredData(page: Page): Promise<any[]>;
export declare function TestsHelper_getUrl({ url, withoutPort }: {
    url: string;
    withoutPort?: boolean;
}): string;
export declare function TestsHelper_elementExists({ page, playwrightTest, locatorOptions, selector, description }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    description: string;
    selector: string;
    locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    };
}): Promise<void>;
export declare function TestsHelper_elementNotEmpty({ page, playwrightTest, description, selector, locatorOptions }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    description: string;
    selector: string;
    locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    };
}): Promise<void>;
export declare function TestsHelper_elementContainsText({ page, playwrightTest, description, selector, locatorOptions, expectedText }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    description: string;
    selector: string;
    expectedText: string;
    locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    };
}): Promise<void>;
export declare function TestsHelper_attachDOMAtFailedTests({ playwrightTest }: {
    playwrightTest: PlaywrightTest;
}): void;
