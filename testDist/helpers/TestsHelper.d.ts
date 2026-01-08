import { Page } from 'playwright/test';
export declare function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null>;
export declare function TestsHelper_getStructuredData(page: Page): Promise<any[]>;
export declare function TestsHelper_getUrl(url: string): string;
