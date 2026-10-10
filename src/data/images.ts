import type { Loc } from '../i18n';

/**
 * Photo slots. The owner supplies every photo.
 * Put the file in src/assets/photos/ and name it <ID>.jpg (or .png, .webp, .avif).
 * No file = the site shows an IMAGE REQUIRED placeholder.
 * Alt text: add it here together with the photo, in every language. Empty alt = decorative image.
 */
export interface Slot {
  id: string;
  page: string;
  section: string;
  /** CSS aspect-ratio, for example "16 / 9". */
  ratio: string;
  /** Existing photo (path under src/assets/photos/, no extension) shown until <ID> is supplied. */
  file?: string;
  alt: Loc;
}

export const slots: Slot[] = [
  {
    id: 'H01',
    page: 'Home',
    section: 'Hero',
    ratio: '3 / 2',
    alt: {
      ru: 'Технический дайвер исследует глубокую подводную пещеру.',
      en: 'Technical diver exploring a deep underwater cavern.',
      zh: '技术潜水员正在探索幽深的水下洞穴。',
    },
  },
  {
    id: 'H02',
    page: 'Home',
    section: 'Philosophy',
    ratio: '2 / 1',
    alt: {
      ru: 'Дайв-бот на поверхности, дайверы погружаются под воду.',
      en: 'Dive boat at the surface with divers descending underwater.',
      zh: '潜水船停在水面，潜水员正在下潜。',
    },
  },
  {
    id: 'H03',
    page: 'Home',
    section: 'SDI block',
    ratio: '6 / 5',
    alt: {
      ru: 'Дайвер исследует голубую подводную пещеру.',
      en: 'Diver exploring a blue underwater cavern.',
      zh: '潜水员正在探索蓝色的水下洞穴。',
    },
  },
  {
    id: 'H04',
    page: 'Home',
    section: 'TDI block',
    ratio: '6 / 5',
    alt: {
      ru: 'Технический дайвер в продвинутом снаряжении внутри подводной пещеры.',
      en: 'Technical diver with advanced equipment inside an underwater cavern.',
      zh: '身穿高级装备的技术潜水员在水下洞穴中。',
    },
  },
  {
    id: 'H05',
    page: 'Home',
    section: 'Meet the Crew',
    ratio: '5 / 2',
    alt: {
      ru: 'Группа дайверов вместе заходит в море со скалистого берега.',
      en: 'Group of divers entering the sea together from a rocky shore.',
      zh: '一群潜水员从岩石岸边一同入海。',
    },
  },
  {
    id: 'T01',
    page: 'Training',
    section: 'Hero',
    ratio: '3 / 2',
    alt: {
      ru: 'Два дайвера тренируются в освещённой солнцем подводной пещере.',
      en: 'Two divers training inside a sunlit underwater cavern.',
      zh: '两名潜水员在阳光照射的水下洞穴中训练。',
    },
  },
  {
    id: 'E01',
    page: 'Expeditions',
    section: 'Hero',
    ratio: '3 / 2',
    alt: {
      ru: 'Техническая дайвинг-экспедиция готовится войти в воду с лодки у отдалённых скал.',
      en: 'Technical diving expedition preparing to enter the water from a boat near remote cliffs.',
      zh: '技术潜水探险队在偏远的悬崖附近准备从船上入水。',
    },
  },
  {
    id: 'C01',
    page: 'Crew',
    section: 'Hero',
    ratio: '3 / 2',
    alt: {
      ru: 'Команда дайверов вместе готовится на скалистом побережье.',
      en: 'Diving team preparing together on a rocky coastline.',
      zh: '潜水团队在岩石海岸上一起做准备。',
    },
  },
  {
    id: 'G01',
    page: 'Gallery',
    section: 'Hero',
    ratio: '3 / 2',
    alt: {
      ru: 'Дайвер плывёт через глубокую синюю подводную пещеру.',
      en: 'Diver swimming through a deep blue underwater cavern.',
      zh: '潜水员游过深蓝色的水下洞穴。',
    },
  },
  {
    id: 'TRY01',
    page: 'Try diving',
    section: 'Hero',
    ratio: '3 / 2',
    file: 'gallery/G-3',
    alt: {
      ru: 'Дайверы спускаются вдоль кораллового рифа с горгониями.',
      en: 'Divers descending along a coral wall with sea fans.',
      zh: '潜水员沿着长满海扇的珊瑚礁壁下潜。',
    },
  },
  {
    id: 'SRV01',
    page: 'Workshop',
    section: 'Hero',
    ratio: '3 / 2',
    file: 'gallery/G-2',
    alt: {
      ru: 'Дайверы готовят техническое снаряжение на палубе лодки.',
      en: 'Divers preparing technical equipment on a boat deck.',
      zh: '潜水员在船甲板上准备技术装备。',
    },
  },
  {
    id: 'PRO01',
    page: 'For pros',
    section: 'Hero',
    ratio: '3 / 2',
    file: 'gallery/G-4',
    alt: {
      ru: 'Технические дайверы с фонарями внутри освещённой солнцем пещеры.',
      en: 'Technical divers with torches inside a sunlit cavern.',
      zh: '手持潜水灯的技术潜水员在阳光照射的洞穴内。',
    },
  },
];

export const slotById = (id: string): Slot => {
  const s = slots.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown image slot: ${id}`);
  return s;
};
