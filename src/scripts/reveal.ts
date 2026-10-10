const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<Animation>();
const easing =
  getComputedStyle(document.documentElement).getPropertyValue('--ease').trim() ||
  'cubic-bezier(0.16, 1, 0.3, 1)';

function play(element: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
  if (reducedMotion.matches || !('animate' in element)) return;
  const animation = element.animate(keyframes, { easing, fill: 'backwards', ...options });
  running.add(animation);
  const forget = () => running.delete(animation);
  animation.addEventListener('finish', forget, { once: true });
  animation.addEventListener('cancel', forget, { once: true });
}

const rise: Keyframe[] = [
  { opacity: 0.25, transform: 'translateY(12px)' },
  { opacity: 1, transform: 'none' },
];

if (!reducedMotion.matches) {
  // Focal moment: the water clears. The hero photograph settles out of a slight blur
  // while the headline arrives line by line.
  const heroImage = document.querySelector('.band.first .bg img');
  if (heroImage) {
    play(
      heroImage,
      [
        { filter: 'blur(6px)', transform: 'scale(1.045)' },
        { filter: 'blur(0)', transform: 'none' },
      ],
      { duration: 1600 },
    );
  }
  document.querySelectorAll('.band.first h1 > span').forEach((line, index) => {
    play(line, rise, { duration: 700, delay: Math.min(index * 80, 160) });
  });
  document
    .querySelectorAll('.band.first .text > :not(h1), .hero-caption, .hero-agencies')
    .forEach((element) => {
      play(element, [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 320 });
    });
}

function enter(element: Element) {
  // The short rule is drawn like a pen stroke in the journal.
  if (element.classList.contains('rule')) {
    play(element, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: 600,
      delay: 150,
    });
    return;
  }
  // Lists arrive as lists: children follow each other, total delay capped.
  if (element.hasAttribute('data-stagger')) {
    [...element.children].forEach((child, index) => {
      play(child, rise, { duration: 700, delay: Math.min(index * 70, 280) });
    });
    return;
  }
  play(element, rise, { duration: 700 });
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
  document
    .querySelectorAll('.reveal, [data-stagger], main .rule')
    .forEach((element) => observer?.observe(element));
}

reducedMotion.addEventListener('change', (event) => {
  if (!event.matches) return;
  observer?.disconnect();
  running.forEach((animation) => animation.cancel());
});
