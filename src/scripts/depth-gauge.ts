/* The gauge shows from the first station of the descent until the routes come up. */
const gauge = document.querySelector<HTMLElement>('.gauge');

if (gauge) {
  const value = gauge.querySelector<HTMLElement>('.v')!;
  const zoneEl = gauge.querySelector<HTMLElement>('.z')!;
  const zones: [number, string][] = JSON.parse(gauge.dataset.zones ?? '[]');
  const spec = [...gauge.querySelectorAll<HTMLElement>('[data-gone]')];
  const marks = [...document.querySelectorAll<HTMLElement>('main [data-depth]')];
  const first = document.querySelector('main .station');
  const end = document.querySelector('[data-depth-end]');
  let queued = false;

  const update = () => {
    queued = false;
    const mid = innerHeight * 0.5;
    const tops = marks.map((m) => [m.getBoundingClientRect().top, Number(m.dataset.depth)]);
    let depth = 0;
    tops.forEach(([top, d], i) => {
      if (top > mid) return;
      const next = tops[i + 1];
      depth = next && next[0] > mid ? d + ((next[1] - d) * (mid - top)) / (next[0] - top) : d;
    });
    depth = Math.max(0, depth);
    value.textContent = String(Math.round(depth));
    zoneEl.textContent = zones.reduce(
      (z, [from, name]) => (depth >= from ? name : z),
      zones[0]?.[1] ?? '',
    );
    spec.forEach((s) => s.classList.toggle('gone', depth > Number(s.dataset.gone)));
    const started = !!first && first.getBoundingClientRect().top < innerHeight * 0.7;
    const ended = !!end && end.getBoundingClientRect().top < innerHeight * 0.4;
    gauge.classList.toggle('on', started && !ended);
    gauge.classList.toggle('lite', depth > 24);
  };

  addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

export {};
