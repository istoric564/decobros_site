import type { Loc, Text } from '../i18n';

export type Agency = 'SDI' | 'TDI';
export type CourseCategory = 'recreational' | 'specialty' | 'professional' | 'technical';

/** Club-specific values. Unknown values stay as REQUEST / ASK — never guess. */
export interface CourseDetails {
  minimumAge: Text;
  prerequisites: Text;
  loggedDives: Text;
  duration: Text;
  theory: Text;
  confinedWater: Text;
  openWater: Text;
  maxDepth: Text;
  price: Text;
  includes: Text;
  location: Text;
}

export interface Course {
  slug: string;
  agency: Agency;
  category: CourseCategory;
  /** Official program names stay in English in every language. */
  title: string;
  shortTitle: string;
  eyebrow: Text;
  subtitle: Loc;
  /** Paragraphs. */
  description: Loc<string[]>;
  focus: Loc<string[]>;
  featured: boolean;
  available: boolean;
  details: CourseDetails;
  /** Large display headline for featured blocks. */
  headline?: Loc;
  /** Primary CTA label. */
  cta?: Loc;
}

const REQUEST: Loc = { ru: 'По запросу', en: 'On request', zh: '按需咨询' };
const ASK: Loc = {
  ru: 'Уточняется у инструктора',
  en: 'Ask your instructor',
  zh: '请向教练咨询',
};

const tbd = (): CourseDetails => ({
  minimumAge: ASK,
  prerequisites: ASK,
  loggedDives: ASK,
  duration: ASK,
  theory: ASK,
  confinedWater: ASK,
  openWater: ASK,
  maxDepth: ASK,
  price: REQUEST,
  includes: REQUEST,
  location: REQUEST,
});

const none: Loc<string[]> = { ru: [], en: [], zh: [] };
const noSubtitle: Loc = { ru: '', en: '', zh: '' };

export const detailLabels: Record<keyof CourseDetails, Loc> = {
  minimumAge: { ru: 'Минимальный возраст', en: 'Minimum age', zh: '最低年龄' },
  prerequisites: { ru: 'Требования', en: 'Prerequisites', zh: '先决条件' },
  loggedDives: { ru: 'Погружений в логбуке', en: 'Logged dives', zh: '潜水日志记录次数' },
  duration: { ru: 'Продолжительность', en: 'Duration', zh: '时长' },
  theory: { ru: 'Теория', en: 'Theory', zh: '理论' },
  confinedWater: {
    ru: 'Бассейн / закрытая вода',
    en: 'Pool / confined water',
    zh: '泳池 / 平静水域',
  },
  openWater: { ru: 'Открытая вода', en: 'Open water', zh: '开放水域' },
  maxDepth: { ru: 'Максимальная глубина', en: 'Maximum depth', zh: '最大深度' },
  price: { ru: 'Стоимость', en: 'Price', zh: '费用' },
  includes: { ru: 'Что входит', en: 'Includes', zh: '费用包含' },
  location: { ru: 'Место проведения', en: 'Location', zh: '地点' },
};

const specialty: Loc = { ru: 'СПЕЦИАЛИЗАЦИЯ', en: 'SPECIALTY', zh: '专项课程' };

const allCourses: Course[] = [
  {
    slug: 'scuba-discovery',
    agency: 'SDI',
    category: 'recreational',
    title: 'Scuba Discovery',
    shortTitle: 'Discovery',
    eyebrow: { ru: 'НАЧНИ ЗДЕСЬ', en: 'START HERE', zh: '从这里开始' },
    subtitle: {
      ru: 'Первое знакомство с дайвингом',
      en: 'Your first encounter with diving',
      zh: '初次体验潜水',
    },
    description: {
      ru: [
        'Программа для тех, кто еще не является сертифицированным дайвером и хочет впервые попробовать погружение с аквалангом под контролем инструктора.',
        'Это не полноценная сертификация Open Water. Основная задача — безопасно познакомить участника со снаряжением, дыханием под водой и базовыми навыками.',
      ],
      en: [
        'A program for people who are not certified divers yet and want to try scuba for the first time under an instructor’s supervision.',
        'This is not a full Open Water certification. The goal is to safely introduce the gear, breathing underwater and the basic skills.',
      ],
      zh: [
        '面向尚未获得潜水认证、希望在教练监督下首次尝试水肺潜水的人士。',
        '这不是完整的开放水域认证课程。主要目的是让参与者安全地了解装备、水下呼吸和基本技能。',
      ],
    },
    focus: none,
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'open-water-scuba-diver',
    agency: 'SDI',
    category: 'recreational',
    title: 'SDI Open Water Scuba Diver',
    shortTitle: 'Open Water',
    eyebrow: { ru: 'ФУНДАМЕНТ', en: 'FOUNDATION', zh: '基础' },
    headline: {
      ru: 'Фундамент самостоятельного дайвинга',
      en: 'The foundation of independent diving',
      zh: '独立潜水的基础',
    },
    subtitle: {
      ru: 'Главный базовый курс для нового дайвера.',
      en: 'The core entry course for a new diver.',
      zh: '新潜水员的核心入门课程。',
    },
    description: {
      ru: [
        'Задача программы — сформировать устойчивые базовые навыки: плавучесть, контроль положения тела, работу с напарником, планирование погружения и безопасные действия в воде.',
        'После успешного завершения курса дайвер получает базовую международную квалификацию для самостоятельных рекреационных погружений в пределах своей сертификации.',
      ],
      en: [
        'The program builds solid basic skills: buoyancy, body position control, buddy work, dive planning and safe behavior in the water.',
        'After completing the course, the diver receives an international entry-level qualification for independent recreational dives within the limits of the certification.',
      ],
      zh: [
        '课程旨在建立扎实的基本技能：浮力、身体姿态控制、潜伴协作、潜水计划和水中安全行为。',
        '顺利完成课程后，潜水员将获得国际通用的入门资质，可在认证范围内进行独立的休闲潜水。',
      ],
    },
    focus: {
      ru: [
        'Теория',
        'Работа со снаряжением',
        'Практика в бассейне',
        'Открытая вода',
        'Контроль плавучести',
        'Работа в паре',
        'Безопасность',
      ],
      en: [
        'Theory',
        'Equipment handling',
        'Confined-water practice',
        'Open water',
        'Buoyancy control',
        'Buddy procedures',
        'Safety',
      ],
      zh: ['理论', '装备操作', '平静水域练习', '开放水域', '浮力控制', '潜伴程序', '安全'],
    },
    featured: true,
    available: true,
    cta: { ru: 'Подробнее о программе', en: 'Program details', zh: '课程详情' },
    details: tbd(),
  },
  {
    slug: 'advanced-adventure-diver',
    agency: 'SDI',
    category: 'recreational',
    title: 'Advanced Adventure Diver',
    shortTitle: 'Advanced Adventure',
    eyebrow: { ru: 'СЛЕДУЮЩИЙ ШАГ', en: 'NEXT STEP', zh: '下一步' },
    subtitle: {
      ru: 'Расширь диапазон опыта',
      en: 'Widen your range of experience',
      zh: '拓展你的经验范围',
    },
    description: {
      ru: [
        'Курс для сертифицированного Open Water Diver, который хочет расширить опыт и познакомиться с несколькими направлениями дальнейшего обучения.',
        'Программа включает Deep Diver и Underwater Navigation и знакомит участника еще с несколькими specialty-направлениями.',
      ],
      en: [
        'A course for a certified Open Water Diver who wants to gain experience and try several paths for further training.',
        'The program includes Deep Diver and Underwater Navigation and introduces a few more specialty areas.',
      ],
      zh: [
        '面向已获得开放水域潜水员认证、希望积累经验并尝试多个进阶方向的潜水员。',
        '课程包含深潜（Deep Diver）和水下导航（Underwater Navigation），并介绍其他几个专项方向。',
      ],
    },
    focus: {
      ru: ['Глубина', 'Навигация', 'Новые условия', 'Самостоятельность', 'Дальнейший путь обучения'],
      en: ['Depth', 'Navigation', 'New conditions', 'Independence', 'Next training steps'],
      zh: ['深度', '导航', '新环境', '独立性', '后续培训路径'],
    },
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'deep-diver',
    agency: 'SDI',
    category: 'specialty',
    title: 'Deep Diver',
    shortTitle: 'Deep',
    eyebrow: specialty,
    subtitle: noSubtitle,
    description: {
      ru: [
        'Специализация по планированию и выполнению глубоких рекреационных погружений. Основной акцент — управление газом, глубинные риски, контроль времени и стабильная техника.',
      ],
      en: [
        'A specialty in planning and making deep recreational dives. The focus is gas management, depth-related risks, time control and stable technique.',
      ],
      zh: ['规划和实施休闲深潜的专项课程。重点是气体管理、深度相关风险、时间控制和稳定的技术。'],
    },
    focus: none,
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'underwater-navigation-diver',
    agency: 'SDI',
    category: 'specialty',
    title: 'Underwater Navigation Diver',
    shortTitle: 'Navigation',
    eyebrow: specialty,
    subtitle: noSubtitle,
    description: {
      ru: [
        'Курс по подводной навигации. Работа с компасом, естественными ориентирами, маршрутами, расстоянием и возвращением к запланированной точке.',
      ],
      en: [
        'An underwater navigation course. Compass work, natural references, routes, distance and returning to the planned point.',
      ],
      zh: ['水下导航课程。学习使用指南针、自然参照物、路线、距离判断以及返回预定地点。'],
    },
    focus: none,
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'night-limited-visibility-diver',
    agency: 'SDI',
    category: 'specialty',
    title: 'Night / Limited Visibility Diver',
    shortTitle: 'Night / Limited Visibility',
    eyebrow: specialty,
    subtitle: noSubtitle,
    description: {
      ru: [
        'Подготовка к погружениям ночью и в условиях ограниченной видимости. Свет, сигналы, навигация, работа в паре и действия при отказе основного источника света.',
      ],
      en: [
        'Preparation for night dives and dives in limited visibility. Lights, signals, navigation, buddy procedures and what to do if the primary light fails.',
      ],
      zh: ['为夜潜和低能见度潜水做准备。内容包括灯光、信号、导航、潜伴程序以及主灯故障时的应对。'],
    },
    focus: none,
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'rescue-diver',
    agency: 'SDI',
    category: 'recreational',
    title: 'Rescue Diver',
    shortTitle: 'Rescue',
    eyebrow: { ru: 'ОТВЕТСТВЕННОСТЬ', en: 'RESPONSIBILITY', zh: '责任' },
    headline: {
      ru: 'Думай не только о себе.',
      en: 'Think beyond yourself.',
      zh: '不只为自己着想。',
    },
    subtitle: noSubtitle,
    description: {
      ru: [
        'Rescue Diver меняет отношение к дайвингу.',
        'Главный акцент программы — распознавание проблем до того, как они превратятся в аварийную ситуацию.',
        'Дайвер учится контролировать собственный стресс, помогать напарнику, работать с уставшим или паническим дайвером и принимать решения в условиях повышенной нагрузки.',
      ],
      en: [
        'Rescue Diver changes how you see diving.',
        'The main focus is spotting problems before they turn into an emergency.',
        'The diver learns to control their own stress, help a buddy, deal with a tired or panicking diver and make decisions under pressure.',
      ],
      zh: [
        '救援潜水员课程会改变你对潜水的看法。',
        '课程重点是在问题演变为紧急情况之前识别它们。',
        '潜水员将学习控制自身压力、帮助潜伴、应对疲惫或惊慌的潜水员，并在高压下做出决策。',
      ],
    },
    focus: {
      ru: [
        'Самоспасение',
        'Распознавание стресса',
        'Помощь дайверу',
        'Аварийные сценарии',
        'Командная работа',
      ],
      en: ['Self-rescue', 'Stress recognition', 'Diver assistance', 'Emergency scenarios', 'Teamwork'],
      zh: ['自救', '识别压力', '协助潜水员', '紧急情况演练', '团队协作'],
    },
    featured: true,
    available: true,
    details: tbd(),
  },
  {
    slug: 'dry-suit-diver',
    agency: 'SDI',
    category: 'specialty',
    title: 'Dry Suit Diver',
    shortTitle: 'Dry Suit',
    eyebrow: specialty,
    subtitle: noSubtitle,
    description: {
      ru: [
        'Курс по безопасному использованию сухого гидрокостюма. Плавучесть, загрузка, клапаны, положение тела и аварийные процедуры.',
      ],
      en: [
        'A course on using a dry suit safely. Buoyancy, weighting, valves, body position and emergency procedures.',
      ],
      zh: ['安全使用干式潜水服的课程。内容包括浮力、配重、阀门、身体姿态和紧急程序。'],
    },
    focus: none,
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'refresher',
    agency: 'SDI',
    category: 'recreational',
    title: 'Refresher Course',
    shortTitle: 'Refresher',
    eyebrow: { ru: 'ВОЗВРАЩЕНИЕ', en: 'RETURN', zh: '回归' },
    subtitle: {
      ru: 'Верни контроль перед следующим погружением',
      en: 'Regain control before your next dive',
      zh: '在下一次潜水前找回掌控感',
    },
    description: {
      ru: [
        'Программа для сертифицированных дайверов после длительного перерыва или перед поездкой.',
        'Повторяем ключевые навыки, проверяем оборудование и возвращаем уверенность под водой.',
      ],
      en: [
        'A program for certified divers after a long break or before a trip.',
        'We review key skills, check the equipment and bring back your confidence underwater.',
      ],
      zh: [
        '面向长时间未潜水或即将出行的持证潜水员。',
        '我们会复习关键技能、检查装备，帮助你重拾水下自信。',
      ],
    },
    focus: {
      ru: [
        'Сборка снаряжения',
        'Проверка в паре',
        'Навыки с маской и регулятором',
        'Плавучесть',
        'Аварийные процедуры',
        'Процедуры всплытия',
      ],
      en: [
        'Equipment setup',
        'Buddy check',
        'Mask and regulator skills',
        'Buoyancy',
        'Emergency procedures',
        'Ascent procedures',
      ],
      zh: ['装备组装', '潜伴检查', '面镜与调节器技能', '浮力', '紧急程序', '上升程序'],
    },
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'divemaster',
    agency: 'SDI',
    category: 'professional',
    title: 'SDI Divemaster',
    shortTitle: 'Divemaster',
    eyebrow: { ru: 'ПРОФЕССИОНАЛЬНЫЙ УРОВЕНЬ', en: 'PROFESSIONAL', zh: '专业级' },
    headline: {
      ru: 'Когда дайвинг становится ответственностью.',
      en: 'When diving becomes a responsibility.',
      zh: '当潜水成为一种责任。',
    },
    subtitle: {
      ru: 'Первый профессиональный уровень SDI.',
      en: 'The first SDI professional level.',
      zh: 'SDI 第一个专业级别。',
    },
    description: {
      ru: [
        'Divemaster — это не просто опытный дайвер. Это специалист, который должен понимать группу, видеть потенциальные проблемы, помогать инструктору и уверенно действовать в реальном дайв-операционном процессе.',
      ],
      en: [
        'A Divemaster is more than an experienced diver. It is a professional who reads the group, sees potential problems, supports the instructor and acts with confidence in real dive operations.',
      ],
      zh: [
        '潜水长不仅仅是经验丰富的潜水员，更是能够了解团队、预见潜在问题、协助教练，并在真实潜水作业中从容应对的专业人士。',
      ],
    },
    focus: {
      ru: [
        'Руководство погружением',
        'Брифинг',
        'Организация группы',
        'Контроль безопасности',
        'Помощь инструктору',
        'Спасательные навыки',
        'Оценка условий',
        'Профессиональное поведение',
      ],
      en: [
        'Dive leadership',
        'Briefing',
        'Group organization',
        'Safety control',
        'Instructor support',
        'Rescue skills',
        'Assessing conditions',
        'Professional conduct',
      ],
      zh: [
        '潜水带领',
        '潜前简报',
        '团队组织',
        '安全管控',
        '协助教练',
        '救援技能',
        '环境评估',
        '职业素养',
      ],
    },
    featured: true,
    available: true,
    cta: { ru: 'Стать Divemaster', en: 'Become a Divemaster', zh: '成为潜水长' },
    details: tbd(),
  },
  {
    slug: 'intro-to-tech',
    agency: 'TDI',
    category: 'technical',
    title: 'TDI Intro to Tech',
    shortTitle: 'Intro to Tech',
    eyebrow: { ru: 'ШАГ 01', en: 'STEP 01', zh: '第 01 步' },
    subtitle: {
      ru: 'Перестрой базовые навыки',
      en: 'Rebuild your core skills',
      zh: '重塑你的基本技能',
    },
    description: {
      ru: [
        'Вход в технический подход к дайвингу.',
        'Курс развивает точную плавучесть, горизонтальный трим, техники передвижения, ситуационную осведомлённость, планирование газа и работу с технической конфигурацией.',
        'Это обучение без декомпрессии.',
      ],
      en: [
        'Your entry into the technical approach to diving.',
        'The course develops precise buoyancy, horizontal trim, propulsion techniques, situational awareness, gas planning and work with a technical configuration.',
        'This is no-decompression training.',
      ],
      zh: [
        '进入技术潜水理念的第一步。',
        '课程培养精准浮力、水平姿态（trim）、推进技术、情境意识、气体计划以及技术装备配置的使用。',
        '本课程为免减压培训。',
      ],
    },
    focus: {
      ru: [
        'Техническая конфигурация',
        'Трим',
        'Плавучесть',
        'Техники передвижения',
        'Согласование газа',
        'Работа с вентилями',
        'Передача газа',
        'Буй (SMB)',
        'Ситуационная осведомлённость',
      ],
      en: [
        'Technical configuration',
        'Trim',
        'Buoyancy',
        'Propulsion',
        'Gas matching',
        'Valve drills',
        'Gas donation',
        'SMB',
        'Situational awareness',
      ],
      zh: [
        '技术配置',
        '水平姿态',
        '浮力',
        '推进技术',
        '气体匹配',
        '阀门演练',
        '气体分享',
        '水面浮标（SMB）',
        '情境意识',
      ],
    },
    featured: true,
    available: true,
    cta: {
      ru: 'Начать техническую подготовку',
      en: 'Start technical training',
      zh: '开始技术潜水培训',
    },
    details: tbd(),
  },
  {
    slug: 'nitrox',
    agency: 'TDI',
    category: 'technical',
    title: 'TDI Nitrox Diver',
    shortTitle: 'Nitrox',
    eyebrow: { ru: 'ШАГ 02', en: 'STEP 02', zh: '第 02 步' },
    subtitle: {
      ru: 'Больше понимания газа',
      en: 'A deeper understanding of gas',
      zh: '更深入地理解气体',
    },
    description: {
      ru: [
        'Базовый курс по использованию обогащенного воздуха Nitrox.',
        'Участник изучает преимущества и ограничения EAN22–EAN40, кислородную экспозицию, MOD, анализ смеси, маркировку баллонов и основы планирования.',
      ],
      en: [
        'An entry course on using enriched air Nitrox.',
        'You learn the benefits and limits of EAN22–EAN40, oxygen exposure, MOD, gas analysis, cylinder marking and planning basics.',
      ],
      zh: [
        '使用高氧空气（Nitrox）的入门课程。',
        '学员将学习 EAN22–EAN40 的优点与限制、氧暴露、最大作业深度（MOD）、气体分析、气瓶标识以及计划基础。',
      ],
    },
    focus: {
      ru: [
        'Теория нитрокса',
        'Кислородная экспозиция',
        'MOD',
        'Анализ смеси',
        'Маркировка баллонов',
        'Планирование',
      ],
      en: ['Nitrox theory', 'Oxygen exposure', 'MOD', 'Gas analysis', 'Cylinder marking', 'Planning'],
      zh: ['高氧理论', '氧暴露', '最大作业深度', '气体分析', '气瓶标识', '潜水计划'],
    },
    featured: false,
    available: true,
    details: tbd(),
  },
  {
    slug: 'advanced-nitrox',
    agency: 'TDI',
    category: 'technical',
    title: 'TDI Advanced Nitrox Diver',
    shortTitle: 'Advanced Nitrox',
    eyebrow: { ru: 'ШАГ 03', en: 'STEP 03', zh: '第 03 步' },
    subtitle: {
      ru: 'Когда газ становится инструментом',
      en: 'When gas becomes a tool',
      zh: '当气体成为工具',
    },
    description: {
      ru: [
        'Продвинутый этап технической подготовки.',
        'Курс развивает работу с Nitrox и смесями с высоким содержанием кислорода, техническим снаряжением, планирование газа, трим, плавучесть, командные процедуры и аварийные навыки.',
      ],
      en: [
        'An advanced stage of technical training.',
        'The course develops work with Nitrox and high-oxygen mixes, technical equipment, gas planning, trim, buoyancy, team procedures and emergency skills.',
      ],
      zh: [
        '技术潜水培训的进阶阶段。',
        '课程培养使用高氧及高含氧混合气、技术装备、气体计划、水平姿态、浮力、团队程序和应急技能的能力。',
      ],
    },
    focus: {
      ru: [
        'Продвинутое планирование газа',
        'Техническая конфигурация',
        'Трим',
        'Плавучесть',
        'Передача газа',
        'Shutdown-процедуры',
        'Командная осведомлённость',
      ],
      en: [
        'Advanced gas planning',
        'Technical configuration',
        'Trim',
        'Buoyancy',
        'Gas sharing',
        'Shutdown procedures',
        'Team awareness',
      ],
      zh: [
        '高级气体计划',
        '技术配置',
        '水平姿态',
        '浮力',
        '气体分享',
        '关阀程序',
        '团队意识',
      ],
    },
    featured: false,
    available: true,
    cta: { ru: 'Обсудить программу', en: 'Discuss the program', zh: '咨询课程' },
    details: tbd(),
  },
];

/** Public list: only programs the club currently teaches. */
export const courses = allCourses.filter((c) => c.available);

export const courseBySlug = (slug: string): Course => {
  const c = courses.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown course: ${slug}`);
  return c;
};

export const trainingDisclaimer: Loc = {
  ru: 'Точный состав, продолжительность, требования и стоимость программы уточняются у инструктора и зависят от условий проведения и действующих стандартов SDI / TDI.',
  en: 'The exact content, duration, requirements and price of a program are confirmed by the instructor and depend on the conditions and the current SDI / TDI standards.',
  zh: '课程的具体内容、时长、要求和费用请向教练确认，并取决于实施条件和现行的 SDI / TDI 标准。',
};
