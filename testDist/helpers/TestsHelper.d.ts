import { Page, Locator } from 'playwright/test';
import { PlaywrightTest } from "../tests/types.js";
export declare function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null>;
export declare function TestsHelper_getStructuredData(page: Page): Promise<any[]>;
export declare function TestsHelper_getUrl({ url, withoutPort }: {
    url: string;
    withoutPort?: boolean;
}): string;
export declare function TestsHelper_elementExists({ playwrightTest, locatorOptions, selector, description }: {
    playwrightTest: PlaywrightTest;
    description: string;
    selector: string;
    locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    };
}): void;
export declare function TestsHelper_elementNotEmpty({ playwrightTest, description, selector, locatorOptions }: {
    playwrightTest: PlaywrightTest;
    description: string;
    selector: string;
    locatorOptions?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    };
}): void;
export declare function TestsHelper_elementContainsText({ playwrightTest, description, selector, locatorOptions, expectedText }: {
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
}): void;
