import { Page } from 'playwright/test';
import { PlaywrightTest } from "../tests/types.js";
export declare function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null>;
export declare function TestsHelper_getStructuredData(page: Page): Promise<any[]>;
export declare function TestsHelper_getUrl(url: string): string;
export declare function TestsHelper_elementExists(playwrightTest: PlaywrightTest, description: string, selector: string): void;
export declare function TestsHelper_elementNotEmpty(playwrightTest: PlaywrightTest, description: string, selector: string): void;
export declare function TestsHelper_elementContainsText(playwrightTest: PlaywrightTest, description: string, selector: string, expectedText: string): void;
