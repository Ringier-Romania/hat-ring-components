import { PlaywrightTest } from "../types";
import type { Page } from "playwright/test";
export declare function TestList_infiniteScrollPagination({ page, playwrightTest, listSelector, itemSelector, buttonSelector, loadTimeout }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    listSelector?: string;
    itemSelector?: string;
    buttonSelector?: string;
    loadTimeout?: number;
}): Promise<void>;

