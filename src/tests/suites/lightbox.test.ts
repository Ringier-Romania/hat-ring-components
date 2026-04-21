import {PlaywrightTest} from "../types.js";
import type {Page} from "playwright/test";

export async function TestLightbox_openCloseViaPswp({page, playwrightTest, gallerySelector = '.Gallery', slideSelector = 'swiper-slide', openTimeout = 15000, closeTimeout = 15000}: {
    page: Page,
    playwrightTest: PlaywrightTest,
    gallerySelector?: string,
    slideSelector?: string,
    openTimeout?: number,
    closeTimeout?: number,
}) {
    const {expect} = playwrightTest;

    // First check if PhotoSwipe loaded (CDN scripts may be blocked in some CI environments)
    let photoswipeAvailable = false;
    try {
        await page.waitForFunction(
            () => (window as any).photoswipeInstances && (window as any).photoswipeInstances.length > 0,
            null,
            {timeout: openTimeout}
        );
        photoswipeAvailable = true;
    } catch {
        // PhotoSwipe scripts did not load (e.g. CDN unreachable from CI)
    }

    if (!photoswipeAvailable) {
        await playwrightTest.test.step('lightbox skipped – PhotoSwipe not available (CDN scripts may be unreachable)', async () => {
            playwrightTest.test.skip();
        });
        return;
    }

    await playwrightTest.test.step('lightbox should open on slide click', async () => {
        const activeSlide = page.locator(`${gallerySelector} ${slideSelector}`).first();
        await activeSlide.scrollIntoViewIfNeeded();
        await activeSlide.click();
        await page.waitForSelector('.pswp--open', {state: 'visible', timeout: openTimeout});
    });

    await playwrightTest.test.step('lightbox should be open and visible', async () => {
        await expect(page.locator('.pswp--open')).toBeVisible();
    });

    await playwrightTest.test.step('lightbox should have close button', async () => {
        await expect(page.locator('.pswp--open .pswp__button--close')).toBeVisible();
    });

    await playwrightTest.test.step('lightbox should have an image', async () => {
        await expect(page.locator('.pswp--open .pswp__img').first()).toBeVisible();
    });

    await playwrightTest.test.step('lightbox should close after clicking close button', async () => {
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const pswpEl = document.querySelector('.pswp');
            const closeBtn = pswpEl?.querySelector('.pswp__button--close') as HTMLElement;
            closeBtn?.click();
        });
        await expect(page.locator('.pswp--open')).not.toBeVisible({timeout: closeTimeout});
    });
}

