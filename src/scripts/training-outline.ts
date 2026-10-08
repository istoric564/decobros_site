const reader = document.querySelector<HTMLElement>('.training-reader');
if (reader) {
  const links = [...reader.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => !!element);
  const current = reader.querySelector<HTMLElement>('[data-toc-current]');
  const mobile = reader.querySelector<HTMLDetailsElement>('.training-mobile-outline');
  let scheduled = false;
  let activeId: string | undefined;
  const update = () => {
    scheduled = false;
    const readingLine = Math.min(window.innerHeight * 0.25, 160);
    const active = sections
      .filter((section) => section.getBoundingClientRect().top <= readingLine)
      .at(-1);
    const id = active?.id ?? '';
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (current)
      current.textContent =
        links.find((link) => link.hash === '#' + id)?.textContent ?? current.dataset.overview ?? '';
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  links.forEach((link) =>
    link.addEventListener('click', () => {
      if (mobile) mobile.open = false;
    }),
  );
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(reader);
  update();
}
