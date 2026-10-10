/* Three real minutes once the reader reaches the stop; one rule of the standard every 30 s. */
const T = 180;
const section = document.getElementById('stop');

if (section) {
  const tEl = section.querySelector<HTMLElement>('.t')!;
  const bar = section.querySelector<HTMLElement>('.bar i')!;
  const state = section.querySelector<HTMLElement>('.state')!;
  const items = [...section.querySelectorAll('.rules li')];
  let start = 0;

  const tick = () => {
    const e = Math.min(T, (performance.now() - start) / 1000);
    const left = Math.ceil(T - e);
    tEl.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    bar.style.width = `${(e / T) * 100}%`;
    items.forEach((li, i) => li.classList.toggle('done', e >= (i + 1) * 30));
    if (e < T) requestAnimationFrame(tick);
    else state.textContent = section.dataset.done ?? '';
  };

  new IntersectionObserver(
    ([e], ob) => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      start = performance.now();
      state.textContent = section.dataset.running ?? '';
      tick();
    },
    { rootMargin: '0px 0px -55% 0px' },
  ).observe(section);
}

export {};
