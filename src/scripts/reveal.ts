const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<Animation>();
const easing = getComputedStyle(document.documentElement).getPropertyValue('--motion-ease').trim();

function enter(element: Element, delay = 0) {
  if (reducedMotion.matches || !('animate' in element)) return;
  const animation = element.animate(
    [
      { opacity: 0.25, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 700, delay, easing },
  );
  running.add(animation);
  const forget = () => running.delete(animation);
  animation.addEventListener('finish', forget, { once: true });
  animation.addEventListener('cancel', forget, { once: true });
}

// The headline arrives as two connected lines; the photograph stays still.
if (!reducedMotion.matches) {
  document.querySelectorAll('.band.first h1 > span').forEach((line, index) => {
    enter(line, Math.min(index * 80, 160));
  });
}

// Content is visible by default, including when scripts or observers are unavailable.
let observer: IntersectionObserver | undefined;
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        enter(entry.target);
        observer?.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element));
}

reducedMotion.addEventListener('change', (event) => {
  if (!event.matches) return;
  observer?.disconnect();
  running.forEach((animation) => animation.cancel());
});
