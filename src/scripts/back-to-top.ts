const button = document.querySelector<HTMLButtonElement>('.back-to-top');
if (button) {
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const longPage = document.documentElement.scrollHeight > window.innerHeight * 1.75;
    button.hidden = !longPage || window.scrollY < window.innerHeight * 0.75;
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  button.addEventListener('click', () => {
    document
      .querySelector<HTMLAnchorElement>('.site-header .brand')
      ?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
  update();
}
