import { PlaywrightTest } from "../types";
import type { Page } from "playwright/test";
export declare function TestPerformance_imagesLoadingStrategy({ page, playwrightTest, imageSrcToSkip }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    imageSrcToSkip?: string[];
}): Promise<void>;
export declare function TestPerformance_visibleIframesLazyLoading({ page, playwrightTest, iframeSrcToSkip }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    iframeSrcToSkip?: string[];
}): Promise<void>;
