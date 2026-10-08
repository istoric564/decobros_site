import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '/',
  '/training',
  '/expeditions',
  '/crew',
  '/gallery',
  '/contact',
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
    await page.evaluate(() =>
      Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))),
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
      if (width === 2560) expect(frame!.width / width).toBeGreaterThan(0.82);
      const hero = page.locator('.band.first');
      if (width >= 960 && (await hero.count())) {
        const box = await hero.boundingBox();
        heroHeight ??= box!.height;
        expect(Math.abs(box!.height - heroHeight), route + ' hero height').toBeLessThan(1);
        const title = await hero.locator('h1').boundingBox();
        expect(title!.y).toBeGreaterThanOrEqual(box!.y);
        expect(title!.y + title!.height).toBeLessThanOrEqual(box!.y + box!.height);
      }
    }
  }
});

test('header stays pinned and anchored sections are not covered by it', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/training');
    const header = page.locator('.site-header');
    expect((await header.boundingBox())!.y).toBe(0);
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    const pinned = await header.boundingBox();
    expect(pinned!.y).toBe(0);
    await page.goto('/training#technical');
    const heading = await page.locator('#tech-h').boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(pinned!.height);
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
  await expect(page.locator('.site-header .brand')).toBeFocused();
});

test('training outline follows sections in both scroll directions and links to them', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/training');
  const outline = page.locator('.training-outline nav');
  for (const id of ['recreational', 'specialties', 'professional', 'technical', 'specialties']) {
    await page.locator(`#${id}`).evaluate((el) =>
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + 40,
        behavior: 'instant',
      }),
    );
    await expect(outline.locator(`a[href='#${id}']`)).toHaveAttribute('aria-current', 'location');
    const navBox = await outline.boundingBox();
    const sectionBox = await page.locator(`#${id}`).boundingBox();
    expect(navBox!.x + navBox!.width).toBeLessThanOrEqual(sectionBox!.x);
  }
  await outline.locator("a[href='#technical']").click();
  await expect(page).toHaveURL(/#technical$/);
  await expect(outline.locator("a[href='#technical']")).toHaveAttribute('aria-current', 'location');
});

test('mobile training outline closes after choosing a section and clears its heading', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/training');
  await page.locator('#recreational').scrollIntoViewIfNeeded();
  const outline = page.locator('.training-mobile-outline');
  await outline.locator('summary').click();
  await outline.locator("a[href='#technical']").click();
  await expect(outline).not.toHaveAttribute('open');
  await expect(outline.locator('[data-toc-current]')).toHaveText('Технический фундамент');
  await expect
    .poll(async () => {
      const nav = await outline.boundingBox();
      const heading = await page.locator('#tech-h').boundingBox();
      return heading!.y >= nav!.y + nav!.height;
    })
    .toBe(true);
});

test('training outline labels are localized', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [route, label] of [
    ['/training', 'Специализации'],
    ['/en/training', 'Specialties'],
    ['/zh/training', '专项课程'],
  ]) {
    await page.goto(route);
    await expect(page.locator('.training-outline a').nth(1)).toHaveText(label);
  }
});
