/*
  Workshop page. The service card ticks its items off one by one when it comes into view,
  and the breathing wave runs only while it is on screen. With reduced motion the card is
  checked at once and the wave is drawn still.
*/
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

const card = document.getElementById('svc');
if (card) {
  const rows = [...card.querySelectorAll('li')];
  const tick = () =>
    RM
      ? rows.forEach((r) => r.classList.add('done'))
      : rows.forEach((r, i) => setTimeout(() => r.classList.add('done'), 700 + i * 650));
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      tick();
    },
    { threshold: 0.4 },
  );
  io.observe(card);
}

const cv = document.getElementById('wave') as HTMLCanvasElement | null;
const ctx = cv?.getContext('2d');
if (cv && ctx) {
  // One breath ≈ 5 s: a fast inhale, a slow exhale, a short pause.
  const breath = (x: number) => {
    const ph = ((x % 5) + 5) % 5;
    if (ph < 1.6) return Math.sin(((ph / 1.6) * Math.PI) / 2);
    if (ph < 4.2) return Math.cos((((ph - 1.6) / 2.6) * Math.PI) / 2);
    return 0;
  };
  let W = 0;
  let H = 0;
  let on = false;
  let raf = 0;
  const t0 = performance.now();

  const size = () => {
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (now: number) => {
    const t = RM ? 0 : (now - t0) / 1000;
    const yOf = (px: number) => H / 2 - (breath((px / W) * 20 - t) * 0.8 - 0.3) * H * 0.5;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(233,240,244,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
    ctx.strokeStyle = '#e9f0f4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 2) {
      if (px) ctx.lineTo(px, yOf(px));
      else ctx.moveTo(px, yOf(px));
    }
    ctx.stroke();
    const hx = W * 0.82;
    ctx.fillStyle = '#ff6a2b';
    ctx.beginPath();
    ctx.arc(hx, yOf(hx), 4, 0, Math.PI * 2);
    ctx.fill();
    if (on && !RM) raf = requestAnimationFrame(draw);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    size();
    if (W) draw(performance.now());
  };

  new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    if (on) start();
    else cancelAnimationFrame(raf);
  }).observe(cv);
  addEventListener('resize', () => on && start());
}
