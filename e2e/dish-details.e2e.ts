import { test, expect } from '@playwright/test';
import { configuredLine } from '../src/dishes/configuration';
import { getStoreStatus } from '../src/data/hours';

process.env.TZ = 'Asia/Jerusalem';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-08T10:00:00Z'));
  await page.goto('/');
});

test('dish card, live price, focus, internal scrolling and menu position', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const card = page.getByRole('button', { name: 'פרטים והתאמה: פאד תאי', exact: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.evaluate((element) => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
  const position = await page.evaluate(() => window.scrollY);
  await card.getByRole('img').click();
  const dialog = page.getByRole('dialog', { name: 'פאד תאי', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img', { name: 'פאד תאי', exact: true })).toBeVisible();
  await expect.poll(() => dialog.getByRole('img').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(300);
  await page.screenshot({ path: `/tmp/sushi-dish-${testInfo.project.name}.png` });
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await dialog.getByRole('combobox', { name: 'בחירת תוספת (חובה)' }).click();
  await page.getByRole('option', { name: /^עוף/ }).click();
  await dialog.getByRole('checkbox', { name: 'ללא בצל ירוק' }).check();
  await dialog.getByRole('textbox', { name: 'בקשות מיוחדות למנה' }).fill('בלי חריף');
  await expect(dialog.getByRole('button', { name: /הוסף לסל.*₪56/ })).toBeVisible();
  const footer = await dialog.getByRole('button', { name: /הוסף לסל/ }).boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  expect(Math.abs(await page.evaluate(() => window.scrollY) - position)).toBeLessThan(3);
  expect(errors).toEqual([]);
});

test('customizations and notes survive cart editing and a page reload', async ({ page }) => {
  const card = page.getByRole('button', { name: 'פרטים והתאמה: ספייסי סלמון (8 יח׳)', exact: true });
  await card.click();
  let dialog = page.getByRole('dialog', { name: 'ספייסי סלמון (8 יח׳)', exact: true });
  await dialog.getByRole('checkbox', { name: 'ללא מלפפון' }).check();
  await dialog.getByRole('textbox', { name: 'בקשות מיוחדות למנה' }).fill('לחתוך ל-10 יחידות');
  await dialog.getByRole('button', { name: /הוסף לסל.*₪52/ }).click();
  await expect(dialog).toBeHidden();
  await page.reload();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('sushiwok:cart:v1')!));
  expect(stored).toHaveLength(1);
  expect(stored[0].notes).toBe('לחתוך ל-10 יחידות');
  expect(stored[0].customization.removedIngredients).toEqual(['מלפפון']);
  // Header and mobile bar expose different entry buttons; use the header control.
  await page.locator('header').getByRole('button', { name: /עגלה|הזמנה|סל/ }).last().click();
  await page.getByRole('button', { name: 'עריכת ספייסי סלמון (8 יח׳)' }).click();
  dialog = page.getByRole('dialog', { name: 'ספייסי סלמון (8 יח׳)', exact: true });
  await expect(dialog.getByRole('checkbox', { name: 'ללא מלפפון' })).toBeChecked();
  await expect(dialog.getByRole('textbox', { name: 'בקשות מיוחדות למנה' })).toHaveValue('לחתוך ל-10 יחידות');
  await dialog.getByRole('textbox', { name: 'בקשות מיוחדות למנה' }).fill('בלי חריף');
  await dialog.getByRole('button', { name: /שמירת השינויים.*₪52/ }).click();
  await expect(dialog).toBeHidden();
  const edited = await page.evaluate(() => JSON.parse(localStorage.getItem('sushiwok:cart:v1')!));
  expect(edited[0].lineId).toBe(stored[0].lineId);
  expect(edited[0].notes).toBe('בלי חריף');
  expect(edited[0].unitPrice).toBe(52);
});

test('closed-store browsing keeps ordering blocked', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-06T10:00:00Z'));
  await page.reload();
  await page.getByRole('button', { name: 'פרטים והתאמה: פאד תאי', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'פאד תאי', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: /הוסף לסל/ })).toBeDisabled();
});

test('production API derives prices and preserves notes', async ({ request }) => {
  const body = {
    requestId: crypto.randomUUID(),
    items: [{ ...configuredLine('pad-thai', { choice: 'עוף', removedIngredients: ['גזר'] }, 1, 'בלי חריף'), lineId: 'browser-test', unitPrice: 1 }],
    customer: { name: 'בדיקת מערכת', phone: '0501234567', fulfillment: 'pickup' }, expectedSubtotal: 56,
  };
  for (const endpoint of ['/api/orders', 'http://127.0.0.1:4177/api/orders']) {
  const response = await request.post(endpoint, { data: body });
  const result = await response.json();
  if (getStoreStatus().open) {
    expect(response.status()).toBe(200);
    expect(result.total).toBe(56);
    expect(result.items[0].notes).toBe('בלי חריף');
    expect(result.items[0].options).toContain('ללא גזר');
  } else {
    expect(response.status()).toBe(400);
    expect(result.error).toBe('המסעדה סגורה להזמנות');
  }
  }
});
