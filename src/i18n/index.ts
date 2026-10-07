/**
 * Site languages. Russian is the default and lives at the root (/training).
 * Other languages use a path prefix (/en/training, /zh/training).
 */
export const locales = ['ru', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

/** Value for the html lang attribute. */
export const htmlLang: Record<Locale, string> = { ru: 'ru', en: 'en', zh: 'zh-Hans' };
/** Value for og:locale. */
export const ogLocale: Record<Locale, string> = { ru: 'ru_RU', en: 'en_US', zh: 'zh_CN' };
/** Language names for the switcher, each in its own language. */
export const localeNames: Record<Locale, { short: string; full: string }> = {
  ru: { short: 'RU', full: 'Русский' },
  en: { short: 'EN', full: 'English' },
  zh: { short: '中文', full: '简体中文' },
};

/** A text with a value for every language. */
export type Loc<T = string> = Record<Locale, T>;
/** A text that is either the same in every language or translated. */
export type Text = string | Loc;

const isLoc = (v: unknown): v is Loc<unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v) && 'ru' in v;

/** Pick the value for a language. Plain values are returned as is. */
export function t<T>(value: Loc<T>, locale: Locale): T;
export function t(value: Text, locale: Locale): string;
export function t<T>(value: T | Loc<T>, locale: Locale): T;
export function t(value: unknown, locale: Locale): unknown {
  return isLoc(value) ? value[locale] : value;
}

/** t() bound to one language. */
interface BoundT {
  <T>(value: Loc<T>): T;
  (value: Text): string;
  <T>(value: T | Loc<T>): T;
}
export const translator = (locale: Locale): BoundT =>
  ((value: unknown) => t(value, locale)) as BoundT;

const isLocale = (v: string | undefined): v is Locale =>
  !!v && (locales as readonly string[]).includes(v);

/** Deploy base without trailing slash: '' at a domain root, '/decobros_site' on GitHub Pages. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const stripBase = (pathname: string): string =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;

/** Language of a URL: the first path segment, or the default. */
export const localeFromUrl = (url: URL): Locale => {
  const seg = stripBase(url.pathname).split('/')[1];
  return isLocale(seg) ? seg : defaultLocale;
};

/** Path without the base and language prefix: /en/training -> /training. */
export const stripLocale = (raw: string): string => {
  const pathname = stripBase(raw);
  const seg = pathname.split('/')[1];
  if (!isLocale(seg)) return pathname || '/';
  return pathname.slice(seg.length + 1) || '/';
};

/** Add the language prefix to an internal path: ('en', '/training#x') -> /en/training#x. */
export const localePath = (locale: Locale, path: string): string =>
  BASE + (locale === defaultLocale ? path : `/${locale}${path}`);

/** getStaticPaths for pages under src/pages/[...locale]/. */
export const localeStaticPaths = () =>
  locales.map((l) => ({ params: { locale: l === defaultLocale ? undefined : l } }));

/** Prefix a site-root path with the deploy base: '/favicon.svg' -> /decobros_site/favicon.svg. */
export const withBase = (path: string): string => BASE + path;
