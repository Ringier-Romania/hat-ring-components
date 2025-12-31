import { Page } from 'playwright/test';

export async function TestsHelper_getMetaContent(page: Page, selector: string): Promise<string | null> {
  return await page.locator(selector).getAttribute('content');
}

export async function TestsHelper_getStructuredData(page: Page): Promise<any[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').all();
  const data: any[] = [];
  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      try {
        data.push(JSON.parse(content));
      } catch (e) {
        console.warn('Failed to parse JSON-LD:', e);
      }
    }
  }
  return data;
}
