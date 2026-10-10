/*
  Water in the dark sections: slow light shafts from above and drifting marine snow.
  Heavy, so only on capable devices, only while the section is on screen; otherwise
  the section keeps its static gradient.
*/
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
const capable =
  !RM && !nav.connection?.saveData && (nav.deviceMemory ?? 8) >= 4 && innerWidth >= 768;

interface Flake {
  x: number;
  y: number;
  r: number;
  s: number;
  a: number;
  p: number;
}

if (capable) {
  document.querySelectorAll<HTMLCanvasElement>('canvas.sea').forEach((cv) => {
    const ctx = cv.getContext('2d');
    const host = cv.parentElement;
    if (!ctx || !host) return;
    const deep = cv.dataset.mode === 'deep';
    const t0 = performance.now();
    let W = 0;
    let H = 0;
    let flakes: Flake[] = [];
    let on = false;
    let raf = 0;

    const size = () => {
      const dpr = Math.min(1.5, devicePixelRatio || 1);
      W = host.clientWidth;
      H = host.clientHeight;
      if (!W || !H) return;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(240, Math.round((W * H) / (deep ? 9000 : 14000)));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        s: Math.random() * 0.25 + 0.05,
        a: Math.random() * 0.5 + 0.15,
        p: Math.random() * 6.28,
      }));
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const rays = deep ? 4 : 6;
      const len = deep ? H * 0.55 : H;
      for (let i = 0; i < rays; i++) {
        const cx = W * (0.15 + (i * 0.7) / rays) + Math.sin(t * 0.13 + i * 1.7) * W * 0.04;
        const sp = W * (0.05 + 0.03 * Math.sin(t * 0.21 + i));
        const a = (deep ? 0.05 : 0.07) * (0.6 + 0.4 * Math.sin(t * 0.3 + i * 2));
        const g = ctx.createLinearGradient(0, 0, 0, len);
        g.addColorStop(0, `rgba(159,198,220,${a})`);
        g.addColorStop(1, 'rgba(159,198,220,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx - sp * 0.3, 0);
        ctx.lineTo(cx + sp * 0.3, 0);
        ctx.lineTo(cx + sp * 2.2, len);
        ctx.lineTo(cx - sp * 2.2, len);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      for (const f of flakes) {
        f.y += f.s;
        f.x += Math.sin(t * 0.4 + f.p) * 0.08;
        if (f.y > H + 4) {
          f.y = -4;
          f.x = Math.random() * W;
        }
        ctx.fillStyle = `rgba(220,234,242,${f.a})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, 6.283);
        ctx.fill();
      }
      if (on) raf = requestAnimationFrame(frame);
    };

    new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (on) {
        if (!W) size();
        raf = requestAnimationFrame(frame);
      }
    }).observe(host);

    let rz = 0;
    addEventListener('resize', () => {
      clearTimeout(rz);
      rz = window.setTimeout(size, 200);
    });
  });
}

export {};
