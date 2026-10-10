/*
  The profile of a 45 m technical dive, drawn from data: the line is drawn in, the stop
  labels follow, and the pointer reads time, depth and gas at any moment.
*/
type Point = [t: number, depth: number, gas?: string];
const P: Point[] = [
  [0, 0, 'Trimix 18/45'],
  [3, 45],
  [22, 45],
  [24.7, 21, 'EAN50'],
  [25.7, 21],
  [26, 18],
  [27, 18],
  [27.3, 15],
  [28.3, 15],
  [28.6, 12],
  [30.6, 12],
  [30.9, 9],
  [33.9, 9],
  [34.2, 6, 'O₂'],
  [42.2, 6],
  [42.5, 3],
  [54.6, 3],
  [55, 0],
];

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS = 'http://www.w3.org/2000/svg';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const el = (name: string, attrs: Record<string, string | number>, text?: string | number) => {
  const e = document.createElementNS(NS, name);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (text != null) e.textContent = String(text);
  return e;
};

const stops = P.filter((p, i) => i >= 3 && i < P.length - 1 && p[1] > 0 && P[i + 1][1] === p[1]);
const gasAt = (t: number) => P.reduce((g, p) => (p[0] <= t && p[2] ? p[2] : g), P[0][2]!);
const depthAt = (t: number) => {
  for (let i = 1; i < P.length; i++) {
    const [t0, d0] = P[i - 1];
    const [t1, d1] = P[i];
    if (t <= t1) return d0 + ((d1 - d0) * (t - t0)) / (t1 - t0 || 1);
  }
  return 0;
};

document.querySelectorAll<HTMLElement>('[data-dive-profile]').forEach((fig) => {
  const svg = fig.querySelector<SVGSVGElement>('svg')!;
  const ro = fig.querySelector<HTMLElement>('.readout')!;
  const { min, m, bottom, comma } = fig.dataset;
  const num = (v: number) => (comma ? v.toFixed(1).replace('.', ',') : v.toFixed(1));
  let geom: { Y: (d: number) => number; W: number; l: number; r: number } | null = null;
  let drawn = RM;
  let lastW = 0;

  function render() {
    const W = svg.clientWidth || fig.clientWidth;
    if (!W || W === lastW) return;
    lastW = W;
    const narrow = W < 640;
    const H = Math.round(clamp(W * 0.36, 250, 440));
    const l = narrow ? 30 : 44;
    const r = narrow ? 8 : 16;
    const tp = 22;
    const bt = 30;
    const X = (t: number) => l + (t / 60) * (W - l - r);
    const Y = (d: number) => tp + (d / 50) * (H - tp - bt);
    geom = { Y, W, l, r };
    const fs = narrow ? 9 : 10.5;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('height', String(H));
    svg.replaceChildren();

    const defs = el('defs', {});
    const grad = el('linearGradient', { id: 'water', x1: 0, y1: 0, x2: 0, y2: 1 });
    (
      [
        [0, '#ffffff', 0],
        [0.35, '#e6eef3', 0.8],
        [1, '#9fc6dc', 0.6],
      ] as const
    ).forEach(([o, c, a]) =>
      grad.append(el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a })),
    );
    defs.append(grad);
    svg.append(defs);
    svg.append(
      el('rect', { x: l, y: Y(0), width: W - l - r, height: Y(50) - Y(0), fill: 'url(#water)' }),
    );
    [0, 10, 20, 30, 40, 50].forEach((d) => {
      svg.append(
        el('line', {
          x1: l,
          x2: W - r,
          y1: Y(d),
          y2: Y(d),
          stroke: '#06101a',
          'stroke-opacity': d ? 0.12 : 0.9,
        }),
      );
      svg.append(
        el(
          'text',
          { x: l - 8, y: Y(d) + 3.5, 'text-anchor': 'end', 'font-size': fs, fill: '#55606b' },
          d,
        ),
      );
    });
    [0, 10, 20, 30, 40, 50, 60].forEach((t) => {
      if (narrow && t % 20) return;
      const anchor = t === 0 ? 'start' : t === 60 ? 'end' : 'middle';
      svg.append(
        el(
          'text',
          { x: X(t), y: H - 8, 'text-anchor': anchor, 'font-size': fs, fill: '#55606b' },
          t === 60 ? `60 ${min}` : t,
        ),
      );
    });

    const labels: SVGElement[] = [];
    stops.forEach(([t0, d], i) => {
      const next = P[P.findIndex((p) => p[0] === t0) + 1];
      const g = el('g', {});
      g.append(
        el('line', {
          x1: X(t0),
          x2: X(t0),
          y1: Y(d),
          y2: Y(d) + 8,
          stroke: '#06101a',
          'stroke-opacity': 0.5,
        }),
      );
      if (!narrow || i % 2 === 0 || d === 3) {
        g.append(
          el(
            'text',
            {
              x: (X(t0) + X(next[0])) / 2,
              y: Y(d) - 8,
              'text-anchor': 'middle',
              'font-size': fs,
              fill: '#06101a',
            },
            narrow ? d : `${d} ${m} · ${Math.round(next[0] - t0)}′`,
          ),
        );
      }
      labels.push(g);
    });
    P.filter((p, i) => i > 0 && p[2]).forEach(([t, d, gas]) => {
      const g = el('g', {});
      g.append(el('circle', { cx: X(t), cy: Y(d), r: 4, fill: '#ff6a2b' }));
      g.append(
        el(
          'text',
          { x: X(t) + 9, y: Y(d) + 17, 'text-anchor': 'start', 'font-size': fs, fill: '#c2410c' },
          gas,
        ),
      );
      labels.push(g);
    });
    if (!narrow) {
      const g = el('g', {});
      g.append(
        el(
          'text',
          { x: X(12.5), y: Y(45) - 10, 'text-anchor': 'middle', 'font-size': fs, fill: '#06101a' },
          `${bottom} · 45 ${m} · Trimix 18/45`,
        ),
      );
      labels.push(g);
    }
    labels.forEach((g) => svg.append(g));

    const path = el('path', {
      d: P.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' '),
      fill: 'none',
      stroke: '#06101a',
      'stroke-width': narrow ? 1.6 : 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round',
    }) as SVGPathElement;
    svg.append(path);

    const cur = el('g', { class: 'cur', opacity: 0 });
    cur.append(
      el('line', {
        class: 'cx',
        y1: Y(0),
        y2: Y(50),
        stroke: '#2c7aa6',
        'stroke-dasharray': '3 3',
      }),
    );
    cur.append(
      el('circle', { class: 'cd', r: 5, fill: '#ffffff', stroke: '#2c7aa6', 'stroke-width': 1.5 }),
    );
    svg.append(cur);

    if (!drawn) {
      drawn = true;
      const L = path.getTotalLength();
      path.animate(
        [
          { strokeDasharray: `${L}`, strokeDashoffset: L },
          { strokeDasharray: `${L}`, strokeDashoffset: 0 },
        ],
        { duration: 3600, easing: 'cubic-bezier(0.45, 0, 0.2, 1)', fill: 'backwards' },
      );
      labels.forEach((g, i) =>
        g.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 900,
          delay: 1600 + i * 160,
          fill: 'backwards',
        }),
      );
    }
  }

  const hide = () => {
    ro.style.opacity = '0';
    svg.querySelector('.cur')?.setAttribute('opacity', '0');
  };
  svg.addEventListener('pointermove', (e) => {
    if (!geom) return;
    const box = svg.getBoundingClientRect();
    const { Y, W, l, r } = geom;
    const x = clamp(e.clientX - box.left, l, W - r);
    const t = ((x - l) / (W - l - r)) * 60;
    if (t > 56) return hide();
    const d = depthAt(t);
    svg.querySelector('.cur')!.setAttribute('opacity', '1');
    const cx = svg.querySelector('.cx')!;
    cx.setAttribute('x1', String(x));
    cx.setAttribute('x2', String(x));
    const cd = svg.querySelector('.cd')!;
    cd.setAttribute('cx', String(x));
    cd.setAttribute('cy', String(Y(d)));
    const mm = Math.floor(t);
    const ss = Math.round((t - mm) * 60) % 60;
    ro.textContent = `${mm}:${String(ss).padStart(2, '0')} · ${num(d)} ${m} · ${gasAt(t)}`;
    const fr = fig.getBoundingClientRect();
    const left = Math.min(box.left - fr.left + x + 14, fr.width - ro.offsetWidth - 8);
    ro.style.transform = `translate(${left}px, ${box.top - fr.top + Y(d) - 34}px)`;
    ro.style.opacity = '1';
  });
  svg.addEventListener('pointerleave', hide);

  // Draw when the chart first comes into view, so the line is drawn in front of the reader.
  new IntersectionObserver(
    ([e], ob) => {
      if (!e.isIntersecting) return;
      ob.disconnect();
      render();
      let rz = 0;
      addEventListener('resize', () => {
        clearTimeout(rz);
        rz = window.setTimeout(render, 150);
      });
    },
    { rootMargin: '0px 0px -20% 0px' },
  ).observe(fig);
});

export {};
