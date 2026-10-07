import type { Loc } from '../i18n';

/** Category keys. Labels for each language are in galleryCategoryLabels. */
export const galleryCategories = [
  'All',
  'Training',
  'Expeditions',
  'Underwater',
  'The Crew',
] as const;
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], 'All'>;

export const galleryCategoryLabels: Record<(typeof galleryCategories)[number], Loc> = {
  All: { ru: 'Все', en: 'All', zh: '全部' },
  Training: { ru: 'Обучение', en: 'Training', zh: '培训' },
  Expeditions: { ru: 'Экспедиции', en: 'Expeditions', zh: '探险' },
  Underwater: { ru: 'Под водой', en: 'Underwater', zh: '水下' },
  'The Crew': { ru: 'Команда', en: 'The Crew', zh: '团队' },
};

export interface GalleryItem {
  /** File name without extension in src/assets/photos/gallery/. */
  file: string;
  category: GalleryCategory;
  alt: Loc;
}

export const galleryItems: GalleryItem[] = [
  {
    file: 'G-1',
    category: 'Underwater',
    alt: {
      ru: 'Два дайвера с фонарями исследуют палубу затонувшего судна.',
      en: 'Two divers with torches exploring the deck of a sunken ship.',
      zh: '两名手持潜水灯的潜水员正在探索沉船甲板。',
    },
  },
  {
    file: 'G-2',
    category: 'The Crew',
    alt: {
      ru: 'Дайверы готовят техническое снаряжение на палубе лодки на рассвете.',
      en: 'Divers preparing technical equipment on a boat deck at sunrise.',
      zh: '日出时分，潜水员在船甲板上准备技术装备。',
    },
  },
  {
    file: 'G-3',
    category: 'Underwater',
    alt: {
      ru: 'Дайверы спускаются вдоль кораллового рифа с горгониями.',
      en: 'Divers descending along a coral wall with sea fans.',
      zh: '潜水员沿着长满海扇的珊瑚礁壁下潜。',
    },
  },
  {
    file: 'G-4',
    category: 'Training',
    alt: {
      ru: 'Технические дайверы с фонарями внутри освещённой солнцем пещеры.',
      en: 'Technical divers with torches inside a sunlit cavern.',
      zh: '手持潜水灯的技术潜水员在阳光照射的洞穴内。',
    },
  },
  {
    file: 'G-6',
    category: 'Expeditions',
    alt: {
      ru: 'Дайвер плывёт со стаей рыб под известняковыми скалами.',
      en: 'Diver swimming with a school of fish below limestone cliffs.',
      zh: '潜水员在石灰岩峭壁下与鱼群同游。',
    },
  },
  {
    file: 'G-7',
    category: 'Expeditions',
    alt: {
      ru: 'Дайверы и манта под яхтой-сафари на закате.',
      en: 'Divers and a manta ray under a liveaboard yacht at sunset.',
      zh: '日落时分，潜水员和蝠鲼在船宿游艇下方。',
    },
  },
  {
    file: 'G-8',
    category: 'Expeditions',
    alt: {
      ru: 'Два дайвера в сеноте, освещённом солнечными лучами.',
      en: 'Two divers in a cenote lit by sunbeams.',
      zh: '两名潜水员在阳光照耀的天然井中。',
    },
  },
  {
    file: 'G-9',
    category: 'Underwater',
    alt: {
      ru: 'Дайвер с фонарём у корпуса большого затонувшего судна.',
      en: 'Diver with a torch beside the hull of a large shipwreck.',
      zh: '手持潜水灯的潜水员在一艘大型沉船的船体旁。',
    },
  },
];
