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

    await playwrightTest.test.step('lightbox should open on slide click', async () => {
        const activeSlide = page.locator(`${gallerySelector} ${slideSelector}`).first();
        await activeSlide.scrollIntoViewIfNeeded();

        // Wait for PhotoSwipe lightbox to be initialized (scripts loaded from CDN)
        await page.waitForFunction(() => {
            return window['photoswipeInstances'] && window['photoswipeInstances'].length > 0;
        }, {timeout: openTimeout});

        // Click the <a> element inside the slide (PhotoSwipe listens on anchors with data-pswp-width)
        const clickTarget = activeSlide.locator('a[data-pswp-width]').first();
        if (await clickTarget.count() > 0) {
            await clickTarget.click();
        } else {
            await activeSlide.click();
        }

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

