import type { Loc, Text } from '../i18n';

export const brand = {
  short: 'DECOBROSCREW',
  full: 'Decompression Brothers CREW',
  descriptor: 'SDI-TDI DIVING CLUB',
} as const;

const L = {
  try: { ru: 'Попробовать', en: 'Try diving', zh: '体验潜水' },
  training: { ru: 'Обучение', en: 'Training', zh: '培训' },
  expeditions: { ru: 'Экспедиции', en: 'Expeditions', zh: '探险' },
  service: { ru: 'Мастерская', en: 'Workshop', zh: '装备维修' },
  pro: { ru: 'Для профи', en: 'For pros', zh: '专业服务' },
  crew: { ru: 'Команда', en: 'The Crew', zh: '团队' },
  gallery: { ru: 'Галерея', en: 'Gallery', zh: '图库' },
  contact: { ru: 'Контакты', en: 'Contact', zh: '联系' },
  privacy: { ru: 'Конфиденциальность', en: 'Privacy', zh: '隐私' },
  legal: { ru: 'Правовая информация', en: 'Legal', zh: '法律信息' },
} satisfies Record<string, Loc>;

/** Hrefs have no language prefix. Add it with localePath(). */
export const nav = [
  { label: L.try, href: '/try' },
  { label: L.training, href: '/training' },
  { label: L.expeditions, href: '/expeditions' },
  { label: L.service, href: '/service' },
  { label: L.pro, href: '/pro' },
  { label: L.crew, href: '/crew' },
] as const;

export const footerNav = [
  { label: L.try, href: '/try' },
  { label: L.training, href: '/training' },
  { label: L.expeditions, href: '/expeditions' },
  { label: L.service, href: '/service' },
  { label: L.pro, href: '/pro' },
  { label: L.crew, href: '/crew' },
  { label: L.gallery, href: '/gallery' },
  { label: L.contact, href: '/contact' },
] as const;

export const legalNav = [
  { label: L.privacy, href: '/privacy' },
  { label: L.legal, href: '/legal' },
] as const;

/**
 * Real contact data. Fill these values with owner-approved data.
 * A null value shows a [CONTENT REQUIRED] marker and no link.
 * Example values: telegram 'https://t.me/<name>', whatsapp 'https://wa.me/<number>', email 'name@domain'.
 */
/** DEMO: replace with owner-approved values. Set to false when all demo content is replaced. */
export const DEMO_CONTENT = true;

export const contacts: {
  phone: string | null;
  telegram: string | null;
  whatsapp: string | null;
  vk: string | null;
  email: string | null;
} = {
  phone: '+7 966 500-73-01',
  telegram: 'https://t.me/+Hux5fVhKKW8zZWIy',
  whatsapp: null,
  vk: 'https://vk.ru/decobro',
  email: 'DecoBrosCREW@deco.com',
};

/** Text shown instead of a link while a contact has no URL yet. */
export const contactFallback: Partial<Record<keyof typeof contacts, string>> = {
  whatsapp: 'DecoBrosCREW Official',
};

export const location: Loc = {
  ru: 'Новосибирск · международные дайвинг-экспедиции',
  en: 'Novosibirsk · international diving expeditions',
  zh: '新西伯利亚 · 国际潜水探险',
};

/** Club address with a Yandex Maps link. */
export const address = {
  text: {
    ru: 'Комсомольский пр., 1, Новосибирск, 630004',
    en: '1 Komsomolsky Ave, Novosibirsk, 630004, Russia',
    zh: '俄罗斯新西伯利亚共青团大街 1 号，630004',
  } satisfies Loc,
  mapUrl:
    'https://yandex.ru/maps/org/decompression_brothers_crew/1075281059/?ll=82.900203%2C55.030482&z=14',
  embedUrl:
    'https://yandex.ru/map-widget/v1/?ll=82.900203%2C55.030482&z=16&pt=82.900203%2C55.030482%2Cpm2rdm',
};

/** Opening hours, Novosibirsk time. */
export const hours: { days: Loc; time: Loc }[] = [
  {
    days: { ru: 'Пн–Пт', en: 'Mon–Fri', zh: '周一至周五' },
    time: { ru: '19:00–21:00', en: '19:00–21:00', zh: '19:00–21:00' },
  },
  {
    days: { ru: 'Сб–Вс', en: 'Sat–Sun', zh: '周六至周日' },
    time: { ru: 'Закрыто', en: 'Closed', zh: '休息' },
  },
];

const pending: Loc = {
  ru: 'Данные будут указаны перед публикацией',
  en: 'To be provided before publication',
  zh: '将在发布前提供',
};

export const legalEntity = {
  operatorName: {
    ru: 'Decompression Brothers CREW — ТЕСТОВОЕ ЗНАЧЕНИЕ',
    en: 'Decompression Brothers CREW — TEST VALUE',
    zh: 'Decompression Brothers CREW — 测试值',
  },
  operatorType: pending,
  address: pending,
  registrationData: pending,
  privacyEmail: 'privacy@example.com',
} satisfies Record<string, Text>;

export const privacyInfrastructure = {
  hostingProvider: { ru: 'Не выбран', en: 'Not selected', zh: '尚未选定' },
  logFields: {
    ru: 'IP-адрес, время запроса, URL, HTTP-статус, User-Agent — предполагаемый минимальный набор, требует проверки у выбранного хостинга.',
    en: 'IP address, request time, URL, HTTP status, User-Agent — an assumed minimum set; must be confirmed with the chosen host.',
    zh: 'IP 地址、请求时间、URL、HTTP 状态码、User-Agent —— 预计的最小集合，需与所选托管服务商确认。',
  },
  logRetention: {
    ru: 'Будет определено после выбора production-хостинга. Цель — минимально необходимый срок для безопасности и диагностики.',
    en: 'To be set after the production host is chosen. The goal is the minimum period needed for security and diagnostics.',
    zh: '将在选定生产环境托管后确定。目标是满足安全与诊断所需的最短期限。',
  },
} satisfies Record<string, Loc>;

export const contactItems = [
  {
    key: 'phone',
    label: { ru: 'Телефон', en: 'Phone', zh: '电话' },
    note: { ru: '+7 966 500-73-01', en: '+7 966 500-73-01', zh: '+7 966 500-73-01' },
  },
  {
    key: 'telegram',
    label: 'Telegram',
    note: { ru: 'Напишите в чат', en: 'Chat with us', zh: '在线聊天' },
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    note: { ru: 'Отправьте сообщение', en: 'Message us', zh: '给我们留言' },
  },
  {
    key: 'vk',
    label: { ru: 'ВКонтакте', en: 'VK', zh: 'VK' },
    note: { ru: 'Наше сообщество', en: 'Our community', zh: '我们的社群' },
  },
  {
    key: 'email',
    label: { ru: 'Почта', en: 'Email', zh: '电子邮件' },
    note: { ru: 'Напишите письмо', en: 'Write to us', zh: '给我们写信' },
  },
] as const satisfies readonly { key: keyof typeof contacts; label: Text; note: Loc }[];

export function contactHref(key: keyof typeof contacts): string | null {
  const v = contacts[key];
  if (!v) return null;
  if (key === 'email') return `mailto:${v}`;
  if (key === 'phone') return `tel:${v.replace(/[^\d+]/g, '')}`;
  return v;
}

/**
 * Web analytics. IDs come from env at build time (PUBLIC_YANDEX_METRIKA_ID, PUBLIC_GA4_ID).
 * Empty ID = the counter is not built in. Counters load only after the visitor accepts cookies.
 */
export const analytics = {
  yandexMetrikaId: (import.meta.env.PUBLIC_YANDEX_METRIKA_ID ?? '').trim(),
  ga4Id: (import.meta.env.PUBLIC_GA4_ID ?? '').trim(),
};
export const analyticsEnabled = Boolean(analytics.yandexMetrikaId || analytics.ga4Id);
