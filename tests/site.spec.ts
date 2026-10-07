import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = ['/', '/training', '/expeditions', '/crew', '/gallery', '/contact', '/privacy', '/legal'];
const prefixes = ['', '/en', '/zh'];
const routes = prefixes.flatMap((pre) => paths.map((p) => `${pre}${p}`));

for (const r of routes) {
  test(`page ${r}: one h1, no console errors, no horizontal scroll, axe clean`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(r);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(errors).toEqual([]);
    for (const w of [320, 390, 768, 1280, 1920]) {
      await page.setViewportSize({ width: w, height: 900 });
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(over, `horizontal scroll at ${w}px`).toBe(false);
    }
    const res = await new AxeBuilder({ page }).analyze();
    expect(res.violations.map((v) => `${v.id}: ${v.nodes[0].html}`)).toEqual([]);
  });
}

test('404 page works', async ({ page }) => {
  const res = await page.goto('/nope');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'На главную' })).toBeVisible();
});

test('brand names are exact', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  await expect(header).toContainText('DECOBROSCREW');
  await expect(header).toContainText('Decompression Brothers CREW');
  await expect(header).toContainText('SDI-TDI DIVING CLUB');
  const html = await page.content();
  expect(html).not.toMatch(/DecobroCrew|DecoBroCrew|DECOBROCREW/);
});

test('desktop navigation reaches every page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/en/');
  for (const [name, path] of [
    ['Training', '/en/training'],
    ['Expeditions', '/en/expeditions'],
    ['The Crew', '/en/crew'],
    ['Gallery', '/en/gallery'],
  ]) {
    await page.locator('header nav[aria-label="Main"]').getByRole('link', { name }).click();
    await expect(page).toHaveURL(path);
  }
  await page.getByRole('link', { name: 'Get in touch' }).first().click();
  await expect(page).toHaveURL('/en/contact');
});

test('mobile menu: open, focus, escape, lock scroll, link closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/');
  const burger = page.locator('.burger');
  await burger.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await expect(burger).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Открыть меню' })).toBeFocused();
  await burger.click();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Обучение' }).click();
  await expect(page).toHaveURL('/training');
  await expect(page.locator('#mobile-menu')).toBeHidden();
});

test('language switcher keeps the page and sets lang', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/training');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  const sw = page.locator('header .lang-desktop');
  await sw.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL('/en/training');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toContainText('Train for');
  await sw.getByRole('link', { name: '简体中文' }).click();
  await expect(page).toHaveURL('/zh/training');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(sw.getByRole('link', { name: '简体中文' })).toHaveAttribute('aria-current', 'true');
  await sw.getByRole('link', { name: 'Русский' }).click();
  await expect(page).toHaveURL('/training');
});

test('every page links to its translations', async ({ page }) => {
  await page.goto('/zh/gallery');
  for (const [lang, href] of [
    ['ru', '/gallery'],
    ['en', '/en/gallery'],
    ['zh-Hans', '/zh/gallery'],
  ]) {
    const link = page.locator(`link[rel="alternate"][hreflang="${lang}"]`);
    await expect(link).toHaveAttribute('href', new RegExp(`${href}/?$`));
  }
});

test('no cookies and no third-party requests', async ({ page, context }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.hostname !== 'localhost') external.push(r.url());
  });
  for (const r of routes) await page.goto(r);
  expect(external).toEqual([]);
  expect(await context.cookies()).toEqual([]);
});

test('no forms on the site', async ({ page }) => {
  for (const r of routes) {
    await page.goto(r);
    await expect(page.locator('form, input, textarea')).toHaveCount(0);
  }
});
