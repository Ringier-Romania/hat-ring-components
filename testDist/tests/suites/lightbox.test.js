"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLightbox_openCloseViaPswp = TestLightbox_openCloseViaPswp;
async function TestLightbox_openCloseViaPswp({ page, playwrightTest, gallerySelector = '.Gallery', slideSelector = 'swiper-slide', openTimeout = 15000, closeTimeout = 15000 }) {
    const { expect } = playwrightTest;
    await playwrightTest.test.step('lightbox should open on slide click', async () => {
        const activeSlide = page.locator(`${gallerySelector} ${slideSelector}`).first();
        await activeSlide.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
            return window['photoswipeInstances'] && window['photoswipeInstances'].length > 0;
        }, { timeout: openTimeout });
        const clickTarget = activeSlide.locator('a[data-pswp-width]').first();
        if (await clickTarget.count() > 0) {
            await clickTarget.click();
        }
        else {
            await activeSlide.click();
        }
        await page.waitForSelector('.pswp--open', { state: 'visible', timeout: openTimeout });
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
            const closeBtn = pswpEl === null || pswpEl === void 0 ? void 0 : pswpEl.querySelector('.pswp__button--close');
            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.click();
        });
        await expect(page.locator('.pswp--open')).not.toBeVisible({ timeout: closeTimeout });
    });
}
//# sourceMappingURL=lightbox.test.js.map