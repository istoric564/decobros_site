const btn = document.querySelector<HTMLButtonElement>('.burger');
const menu = document.getElementById('mobile-menu');

function setOpen(open: boolean, restoreFocus = false) {
  if (!btn || !menu) return;
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', (open ? btn.dataset.labelClose : btn.dataset.labelOpen) ?? '');
  menu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (open) menu.querySelector<HTMLAnchorElement>('a')?.focus();
  else if (restoreFocus) btn.focus();
}

btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));

menu?.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) setOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (!btn || !menu) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  if (e.key === 'Escape' && open) setOpen(false, true);
  if (e.key === 'Tab' && open) {
    const items = [btn, ...menu.querySelectorAll<HTMLElement>('a')];
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

window.matchMedia('(min-width: 1200px)').addEventListener('change', (m) => {
  if (m.matches) setOpen(false);
});
