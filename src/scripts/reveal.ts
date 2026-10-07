const els = document.querySelectorAll('.reveal');
if (!('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
