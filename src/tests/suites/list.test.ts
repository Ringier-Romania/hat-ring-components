import {PlaywrightTest} from "../types.js";
import type {Page} from "playwright/test";
import {TestsHelper_elementNotEmpty, TestsHelper_elementExists} from "../../helpers/TestsHelper";

export async function TestList_infiniteScrollPagination({page, playwrightTest, listSelector = '.gridWidgetTypeGenericList', itemSelector = '.Item', buttonSelector = '.infiniteScrollButton', loadTimeout = 10000}: {
    page: Page,
    playwrightTest: PlaywrightTest,
    listSelector?: string,
    itemSelector?: string,
    buttonSelector?: string,
    loadTimeout?: number,
}) {
    const {expect} = playwrightTest;
    const itemsFullSelector = `${listSelector} ${itemSelector}`;
    let itemsBeforePagination = 0;

    await playwrightTest.test.step('items should exist before pagination', async () => {
        itemsBeforePagination = await page.locator(itemsFullSelector).count();
        expect(itemsBeforePagination, 'Items should exist before pagination').toBeGreaterThan(0);
    });

    await playwrightTest.test.step('pagination button should be visible', async () => {
        const paginationButton = page.locator(buttonSelector);
        await expect(paginationButton, 'Pagination button should be visible').toBeVisible();
    });

    await playwrightTest.test.step('clicking pagination button should load more items', async () => {
        const paginationButton = page.locator(buttonSelector);
        await paginationButton.scrollIntoViewIfNeeded();
        await paginationButton.click();
        await page.waitForFunction(
            ({selector, prevCount}) => document.querySelectorAll(selector).length > prevCount,
            {selector: itemsFullSelector, prevCount: itemsBeforePagination},
            {timeout: loadTimeout}
        );
        const itemsAfterPagination = await page.locator(itemsFullSelector).count();
        expect(itemsAfterPagination, `Items count should increase after pagination (was ${itemsBeforePagination})`).toBeGreaterThan(itemsBeforePagination);
    });

    await playwrightTest.test.step('new items should have title', async () => {
        await TestsHelper_elementNotEmpty({
            page,
            playwrightTest,
            description: "New items should have titles",
            selector: `${itemsFullSelector} >> nth=${itemsBeforePagination} >> .Title`
        });
    });

    await playwrightTest.test.step('new items should have image', async () => {
        await TestsHelper_elementExists({
            page,
            playwrightTest,
            description: "New items should have images",
            selector: `${itemsFullSelector} >> nth=${itemsBeforePagination} >> .Image img`
        });
    });

    await playwrightTest.test.step('new items should have working links', async () => {
        const firstNewItem = page.locator(itemsFullSelector).nth(itemsBeforePagination);
        const newItemLink = firstNewItem.locator('a').first();
        const href = await newItemLink.getAttribute('href');
        expect(href, 'New item link should have href').toBeTruthy();
        expect(href, 'New item link href should not be empty').not.toBe('');
    });

    await playwrightTest.test.step('new items should not duplicate existing items', async () => {
        const firstItemTitle = await page.locator(itemsFullSelector).first().locator('.Title').textContent();
        const firstNewItem = page.locator(itemsFullSelector).nth(itemsBeforePagination);
        const firstNewItemTitle = await firstNewItem.locator('.Title').textContent();
        expect(firstNewItemTitle, 'New items should not duplicate existing items').not.toBe(firstItemTitle);
    });
}

