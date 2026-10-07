import type { Loc } from '../i18n';

export interface Person {
  slug: string;
  name: Loc;
  role: Loc;
  qualifications: Loc<string[]>;
  specialties: Loc<string[]>;
  languages: Loc<string[]>;
  experience: Loc;
  city?: Loc;
  bio?: Loc;
  /** Portrait file base name in src/assets/photos/. Owner supplies the photo. */
  portrait?: string;
}

const lang = {
  ru: { ru: 'Русский', en: 'Russian', zh: '俄语' },
  en: { ru: 'Английский', en: 'English', zh: '英语' },
  es: { ru: 'Испанский', en: 'Spanish', zh: '西班牙语' },
} satisfies Record<string, Loc>;

const langs = (...l: Loc[]): Loc<string[]> => ({
  ru: l.map((x) => x.ru),
  en: l.map((x) => x.en),
  zh: l.map((x) => x.zh),
});

const moscow: Loc = {
  ru: 'Москва — тестовое значение',
  en: 'Moscow — test value',
  zh: '莫斯科 —— 测试值',
};

/** DEMO CONTENT: all names and data are test values. Replace with real people before launch. */
export const people: Person[] = [
  {
    slug: 'alexey-volkov',
    name: { ru: 'Алексей Волков', en: 'Alexey Volkov', zh: '阿列克谢·沃尔科夫' },
    role: {
      ru: 'Инструктор технического дайвинга',
      en: 'Technical Diving Instructor',
      zh: '技术潜水教练',
    },
    qualifications: {
      ru: ['SDI Instructor — тестовое значение', 'TDI Instructor — тестовое значение'],
      en: ['SDI Instructor — test value', 'TDI Instructor — test value'],
      zh: ['SDI 教练 —— 测试值', 'TDI 教练 —— 测试值'],
    },
    specialties: {
      ru: ['Декомпрессионные погружения', 'Тримикс', 'Рэк-дайвинг', 'Планирование экспедиций'],
      en: ['Decompression diving', 'Trimix', 'Wreck diving', 'Expedition planning'],
      zh: ['减压潜水', '三混气', '沉船潜水', '探险规划'],
    },
    languages: langs(lang.ru, lang.en),
    experience: {
      ru: '15+ лет в дайвинге · 2000+ погружений — ТЕСТОВЫЕ ДАННЫЕ',
      en: '15+ years of diving · 2000+ dives — TEST DATA',
      zh: '15 年以上潜水经验 · 2000 次以上潜水 —— 测试数据',
    },
    city: moscow,
    bio: {
      ru: 'Технический инструктор и руководитель экспедиционных программ. Основной фокус — развитие системного подхода к планированию, командной работе и техническим погружениям.',
      en: 'Technical instructor and head of expedition programs. His focus is a systematic approach to planning, teamwork and technical dives.',
      zh: '技术潜水教练，探险项目负责人。专注于以系统化的方法进行规划、团队协作和技术潜水。',
    },
    portrait: 'CREW-alexey-volkov',
  },
  {
    slug: 'maria-sokolova',
    name: { ru: 'Мария Соколова', en: 'Maria Sokolova', zh: '玛丽亚·索科洛娃' },
    role: { ru: 'Инструктор SDI', en: 'SDI Instructor', zh: 'SDI 教练' },
    qualifications: {
      ru: ['SDI Instructor — тестовое значение'],
      en: ['SDI Instructor — test value'],
      zh: ['SDI 教练 —— 测试值'],
    },
    specialties: {
      ru: ['Рекреационное обучение', 'Плавучесть', 'Спасение', 'Сопровождение поездок'],
      en: ['Recreational training', 'Buoyancy', 'Rescue', 'Trip support'],
      zh: ['休闲潜水培训', '浮力控制', '救援', '行程支持'],
    },
    languages: langs(lang.ru, lang.en),
    experience: {
      ru: '9 лет в дайвинге · 900+ погружений — ТЕСТОВЫЕ ДАННЫЕ',
      en: '9 years of diving · 900+ dives — TEST DATA',
      zh: '9 年潜水经验 · 900 次以上潜水 —— 测试数据',
    },
    city: {
      ru: 'Санкт-Петербург — тестовое значение',
      en: 'Saint Petersburg — test value',
      zh: '圣彼得堡 —— 测试值',
    },
    bio: {
      ru: 'Инструктор рекреационного направления. Работает с базовой подготовкой, развитием плавучести и переходом от начального уровня к более сложным программам.',
      en: 'Recreational instructor. She works on entry-level training, buoyancy and the step from beginner level to more demanding programs.',
      zh: '休闲潜水教练。负责入门培训、浮力提升，以及从初级向更高阶课程的过渡。',
    },
    portrait: 'CREW-maria-sokolova',
  },
  {
    slug: 'dmitry-orlov',
    name: { ru: 'Дмитрий Орлов', en: 'Dmitry Orlov', zh: '德米特里·奥尔洛夫' },
    role: { ru: 'Инструктор TDI', en: 'TDI Instructor', zh: 'TDI 教练' },
    qualifications: {
      ru: ['TDI Instructor — тестовое значение'],
      en: ['TDI Instructor — test value'],
      zh: ['TDI 教练 —— 测试值'],
    },
    specialties: {
      ru: [
        'Advanced Nitrox',
        'Декомпрессионные процедуры',
        'Техническая конфигурация',
        'Рэк-дайвинг',
      ],
      en: ['Advanced Nitrox', 'Decompression Procedures', 'Technical configuration', 'Wreck diving'],
      zh: ['高级高氧', '减压程序', '技术配置', '沉船潜水'],
    },
    languages: langs(lang.ru, lang.en),
    experience: {
      ru: '12 лет в дайвинге · 1400+ погружений — ТЕСТОВЫЕ ДАННЫЕ',
      en: '12 years of diving · 1400+ dives — TEST DATA',
      zh: '12 年潜水经验 · 1400 次以上潜水 —— 测试数据',
    },
    city: moscow,
    bio: {
      ru: 'Технический инструктор. Специализируется на декомпрессионных программах, конфигурации оборудования и формировании устойчивых командных процедур.',
      en: 'Technical instructor. He specializes in decompression programs, equipment configuration and building solid team procedures.',
      zh: '技术潜水教练。专长于减压课程、装备配置以及建立稳定的团队程序。',
    },
    portrait: 'CREW-dmitry-orlov',
  },
  {
    slug: 'andrey-lebedev',
    name: { ru: 'Андрей Лебедев', en: 'Andrey Lebedev', zh: '安德烈·列别杰夫' },
    role: { ru: 'Координатор экспедиций', en: 'Expedition Coordinator', zh: '探险协调员' },
    qualifications: {
      ru: ['Advanced Diver — тестовое значение'],
      en: ['Advanced Diver — test value'],
      zh: ['进阶潜水员 —— 测试值'],
    },
    specialties: {
      ru: ['Логистика экспедиций', 'Планирование поездок', 'Координация команды'],
      en: ['Expedition logistics', 'Travel planning', 'Crew coordination'],
      zh: ['探险后勤', '行程规划', '团队协调'],
    },
    languages: langs(lang.ru, lang.en, lang.es),
    experience: {
      ru: '7 лет в дайвинге · 500+ погружений — ТЕСТОВЫЕ ДАННЫЕ',
      en: '7 years of diving · 500+ dives — TEST DATA',
      zh: '7 年潜水经验 · 500 次以上潜水 —— 测试数据',
    },
    city: moscow,
    bio: {
      ru: 'Координатор поездок и экспедиционной логистики. Отвечает за организацию маршрутов, взаимодействие с принимающей стороной и подготовку группы.',
      en: 'Coordinator of trips and expedition logistics. He organizes routes, works with local hosts and prepares the group.',
      zh: '行程与探险后勤协调员。负责路线安排、与当地接待方的对接以及团队的准备工作。',
    },
    portrait: 'CREW-andrey-lebedev',
  },
];

export const values: Loc[] = [
  { ru: 'Безопасность', en: 'Safety', zh: '安全' },
  { ru: 'Знания', en: 'Knowledge', zh: '知识' },
  { ru: 'Дисциплина', en: 'Discipline', zh: '纪律' },
  { ru: 'Братство', en: 'Brotherhood', zh: '兄弟情谊' },
  { ru: 'Исследование', en: 'Exploration', zh: '探索' },
];
