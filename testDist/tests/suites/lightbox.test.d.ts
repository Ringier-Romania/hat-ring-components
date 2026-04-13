import { PlaywrightTest } from "../types";
import type { Page } from "playwright/test";
export declare function TestLightbox_openCloseViaPswp({ page, playwrightTest, gallerySelector, slideSelector, openTimeout, closeTimeout }: {
    page: Page;
    playwrightTest: PlaywrightTest;
    gallerySelector?: string;
    slideSelector?: string;
    openTimeout?: number;
    closeTimeout?: number;
}): Promise<void>;

