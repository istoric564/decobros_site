import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '/',
  '/try',
  '/training',
  '/training/open-water-scuba-diver',
  '/training/intro-to-tech',
  '/ice',
  '/expeditions',
  '/service',
  '/pro',
  '/crew',
  '/gallery',
  '/contact',
  '/gift',
  '/privacy',
  '/legal',
];
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
    for (const w of [320, 390, 768, 960, 1100, 1280, 1920, 2560]) {
      await page.setViewportSize({ width: w, height: 900 });
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(over, `horizontal scroll at ${w}px`).toBe(false);
    }
    // Reveal animations start mid-opacity; measure contrast on the settled page.
    // Endless loops (partner rows, the online dot) never settle and are skipped.
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => undefined)),
      ),
    );
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
  await expect(page.locator('header')).toContainText('DECOBROSCREW');
  await expect(page.locator('footer')).toContainText('Decompression Brothers CREW');
  await expect(page).toHaveTitle(/SDI-TDI DIVING CLUB/);
  const html = await page.content();
  expect(html).not.toMatch(/DecobroCrew|DecoBroCrew|DECOBROCREW/);
});

test('desktop navigation reaches every page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/en/');
  for (const [name, path] of [
    ['Try diving', '/en/try'],
    ['Training', '/en/training'],
    ['Expeditions', '/en/expeditions'],
    ['Workshop', '/en/service'],
    ['For pros', '/en/pro'],
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

test('page navigation preserves frame, header and hero sizes on wide screens', async ({ page }) => {
  for (const width of [390, 960, 1280, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    let reference: number[] | undefined;
    let heroHeight: number | undefined;
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('.home-rail')).toHaveCount(0);
      const frame = await page.locator('.site-shell').boundingBox();
      const header = await page.locator('.site-header').boundingBox();
      expect(frame).not.toBeNull();
      expect(header).not.toBeNull();
      const dimensions = [frame!.x, frame!.y, frame!.width, header!.height];
      reference ??= dimensions;
      for (let i = 0; i < dimensions.length; i++) {
        expect(Math.abs(dimensions[i] - reference[i]), route + ' at ' + width + 'px').toBeLessThan(
          1,
        );
      }
      if (width === 2560) expect(frame!.width).toBe(1680);
      const hero = page.locator('main > .hero:not(.short):not(:has(.crumbs))');
      if (width >= 960 && (await hero.count()) && !route.endsWith('/')) {
        const box = await hero.boundingBox();
        heroHeight ??= box!.height;
        expect(Math.abs(box!.height - heroHeight), route + ' hero height').toBeLessThan(1);
      }
      if (await hero.count()) {
        const box = await hero.boundingBox();
        const title = await hero.locator('h1').boundingBox();
        expect(title!.y).toBeGreaterThanOrEqual(box!.y);
        expect(title!.y + title!.height).toBeLessThanOrEqual(box!.y + box!.height);
      }
    }
  }
});

test('anchored sections land at the top of the screen', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('about:blank');
    await page.goto('/training#technical');
    // Smooth scrolling may still be under way.
    const top = () => page.locator('#tech-h').evaluate((el) => el.getBoundingClientRect().top);
    await expect
      .poll(async () => {
        const y = await top();
        return y >= 0 && y < 400;
      })
      .toBe(true);
  }
});

test('back to top is available after scrolling a long page and restores keyboard focus', async ({
  page,
}) => {
  await page.goto('/training');
  const control = page.getByRole('button', { name: 'Наверх' });
  await expect(control).toBeHidden();
  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }),
  );
  await expect(control).toBeVisible();
  await control.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('.site-header > .brand')).toBeFocused();
});

test('training lists every program and each opens its own page', async ({ page }) => {
  await page.goto('/training');
  await page.locator('.course-list').getByRole('link', { name: /Rescue Diver/ }).click();
  await expect(page).toHaveURL('/training/rescue-diver');
  await expect(page.locator('h1')).toContainText('Rescue Diver');
  await expect(page.locator('.crumbs a').nth(1)).toHaveAttribute('href', '/training');
  await page.goto('/en/training/nitrox');
  await expect(page.locator('h1')).toContainText('Nitrox');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('gallery filter hides other categories and the viewer opens and closes', async ({ page }) => {
  await page.goto('/gallery');
  const all = await page.locator('#grid li').count();
  await page.locator('.filters button').nth(2).click();
  await expect(page.locator('.filters button').nth(2)).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('#grid li:visible').count()).toBeLessThan(all);
  await page.locator('.filters button').first().click();
  await page.locator('#grid .open').first().click();
  await expect(page.locator('#viewer')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#viewer')).toBeHidden();
});

test('the map loads only after a click', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('.map iframe')).toHaveCount(0);
  await page.route('https://yandex.ru/**', (r) => r.fulfill({ body: '' }));
  await page.locator('.map button').click();
  await expect(page.locator('.map iframe')).toHaveCount(1);
});

test('documents get a table of contents from their sections', async ({ page }) => {
  await page.goto('/privacy');
  const toc = page.locator('.toc a');
  expect(await toc.count()).toBeGreaterThan(2);
  const href = await toc.nth(1).getAttribute('href');
  await expect(page.locator(`.prose h2${href}`)).toHaveCount(1);
});
