/** Loads Yandex Metrica and GA4 only after the visitor accepts cookies. */
const KEY = 'analytics-consent';
type Consent = 'granted' | 'denied';
type W = Window & Record<string, unknown> & { dataLayer?: unknown[] };

function read(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function save(v: Consent) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked: choice lasts for this page only */
  }
}

function addScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.append(s);
}

function loadMetrika(id: number) {
  const w = window as unknown as W;
  const ym = function (...args: unknown[]) {
    (ym.a = ym.a || []).push(args);
  } as ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  ym.l = Date.now();
  w.ym = ym;
  addScript('https://mc.yandex.ru/metrika/tag.js');
  ym(id, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
}

function loadGa4(id: string) {
  const w = window as unknown as W;
  w.dataLayer = w.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // gtag.js expects the arguments object itself.
    w.dataLayer!.push(arguments);
  }
  w.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

let loaded = false;
function load(cfg: { yandexMetrikaId: string; ga4Id: string }) {
  if (loaded) return;
  loaded = true;
  const ymId = Number(cfg.yandexMetrikaId);
  if (Number.isInteger(ymId) && ymId > 0) loadMetrika(ymId);
  if (/^G-[A-Z0-9]+$/i.test(cfg.ga4Id)) loadGa4(cfg.ga4Id);
}

export function initAnalytics() {
  const el = document.getElementById('analytics-config');
  const banner = document.getElementById('consent');
  if (!el || !banner) return;
  const cfg = JSON.parse(el.textContent || '{}');
  const current = read();
  if (current === 'granted') load(cfg);
  else if (current !== 'denied') banner.hidden = false;
  banner.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-consent]');
    if (!btn) return;
    const v = btn.dataset.consent as Consent;
    save(v);
    banner.hidden = true;
    if (v === 'granted') load(cfg);
    // Counters already running cannot be unloaded: reload to stop them.
    else if (loaded) location.reload();
  });
  // Footer button lets the visitor change or withdraw consent.
  document.querySelectorAll('[data-cookie-settings]').forEach((b) =>
    b.addEventListener('click', () => {
      banner.hidden = false;
      banner.querySelector<HTMLButtonElement>('[data-consent]')?.focus();
    }),
  );
}
