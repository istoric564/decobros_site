const grid = document.getElementById('grid');
const viewer = document.getElementById('viewer') as HTMLDialogElement | null;

if (grid && viewer) {
  const stage = viewer.querySelector<HTMLElement>('.stage')!;
  const items = () => [...grid.querySelectorAll<HTMLLIElement>('li:not([hidden])')];
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    const list = items();
    if (list.length === 0) return;
    index = (i + list.length) % list.length;
    const pic = list[index].querySelector('picture');
    stage.replaceChildren();
    if (pic) {
      const clone = pic.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('source, img').forEach((n) => n.setAttribute('sizes', '100vw'));
      clone.querySelector('img')?.setAttribute('loading', 'eager');
      stage.append(clone);
    }
  };

  const close = () => {
    viewer.close();
    document.body.classList.remove('menu-open');
    opener?.focus();
  };

  grid.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.open');
    if (!btn) return;
    opener = btn;
    show(items().indexOf(btn.closest('li') as HTMLLIElement));
    viewer.showModal();
    document.body.classList.add('menu-open');
    viewer.querySelector<HTMLElement>('.close')?.focus();
  });

  viewer.querySelector('.close')?.addEventListener('click', close);
  viewer.querySelector('.prev')?.addEventListener('click', () => show(index - 1));
  viewer.querySelector('.next')?.addEventListener('click', () => show(index + 1));
  viewer.addEventListener('cancel', () => document.body.classList.remove('menu-open'));
  viewer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  document.querySelectorAll<HTMLButtonElement>('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      document
        .querySelectorAll('.chip')
        .forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      grid.querySelectorAll<HTMLLIElement>('li').forEach((li) => {
        li.hidden = f !== 'All' && li.dataset.category !== f;
      });
    });
  });
}
