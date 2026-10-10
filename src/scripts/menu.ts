const btn = document.querySelector<HTMLButtonElement>('.burger');
const menu = document.getElementById('mobile-menu');

function setOpen(open: boolean, restoreFocus = false) {
  if (!btn || !menu) return;
  btn.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (open) menu.querySelector<HTMLAnchorElement>('nav a')?.focus();
  else if (restoreFocus) btn.focus();
}

btn?.addEventListener('click', () => setOpen(true));

menu?.addEventListener('click', (e) => {
  const target = e.target as Element;
  if (target.closest('[data-menu-close]')) setOpen(false, true);
  else if (target.closest('a')) setOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (!menu || menu.hidden) return;
  if (e.key === 'Escape') setOpen(false, true);
  if (e.key === 'Tab') {
    const items = [...menu.querySelectorAll<HTMLElement>('a, button')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

window.matchMedia('(min-width: 1180px)').addEventListener('change', (m) => {
  if (m.matches) setOpen(false);
});
