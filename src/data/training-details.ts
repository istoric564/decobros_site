import type { Loc } from '../i18n';
import type { CourseDetails } from './training';

const L = (ru: string, en: string, zh: string): Loc => ({ ru, en, zh });
const age10 = L(
  'С 18 лет; с 10 лет — с согласием родителей.',
  '18; from 10 with parental consent.',
  '18 岁；10 岁起须家长同意。',
);
const age12 = L(
  'С 18 лет; с 12 лет — с согласием родителей.',
  '18; from 12 with parental consent.',
  '18 岁；12 岁起须家长同意。',
);
const age15 = L(
  'С 18 лет; с 15 лет — с согласием родителей.',
  '18; from 15 with parental consent.',
  '18 岁；15 岁起须家长同意。',
);
const openWater = L(
  'SDI Open Water / Junior Open Water или эквивалент.',
  'SDI Open Water / Junior Open Water or equivalent.',
  'SDI 开放水域／青少年开放水域或同等认证。',
);
const noDiveMinimum = L(
  'Отдельный минимум не установлен.',
  'No separate minimum specified.',
  '未另设最低潜水次数。',
);
const noPool = L(
  'Отдельное занятие не обязательно.',
  'No separate confined-water session required.',
  '不要求单独的平静水域训练。',
);
const certifiedDepth = L(
  'В пределах действующей квалификации; курс не расширяет допуск по глубине.',
  'Within existing certification; this course does not extend depth limits.',
  '遵守现有认证深度限制；本课程不增加深度权限。',
);
const waterLocation = L(
  'Теория и открытая вода; площадку и даты согласуем до записи.',
  'Academics and open water; venue and dates agreed before booking.',
  '理论与开放水域；报名之前确认地点及日期。',
);
const poolLocation = L(
  'Теория, бассейн / закрытая вода и открытая вода; площадки согласуем до записи.',
  'Academics, confined water and open water; venues agreed before booking.',
  '理论、平静水域及开放水域；报名之前确认地点。',
);
const price = L('По запросу', 'On request', '按需咨询');

/** Agency requirements, checked against the official 2026 standards on 2026-10-07.
 * Hours marked recommended are agency guidance, not a promised club timetable.
 * Venues, equipment hire, materials and certification fees are club-specific.
 */
export const trainingDetails = {
  'scuba-discovery': {
    minimumAge: age10,
    prerequisites: L(
      'Сертификат не нужен; навыки плавания, комфорт в воде и медицинская анкета.',
      'No certification; adequate swimming, water comfort and medical questionnaire.',
      '无需认证；须具备游泳能力、适应水中环境并填写健康问卷。',
    ),
    loggedDives: L(
      'Опыт погружений не требуется.',
      'No previous dives required.',
      '不要求潜水经验。',
    ),
    duration: L(
      'SDI рекомендует 2 часа обучения.',
      'SDI recommends 2 training hours.',
      'SDI 建议培训 2 小时。',
    ),
    theory: L(
      'Давление, дыхание, выравнивание давления, снаряжение и сигналы.',
      'Pressure, breathing, equalization, equipment and signals.',
      '压力、呼吸、耳压平衡、装备及信号。',
    ),
    confinedWater: L(
      'Не менее 30 минут перед дополнительным погружением в открытой воде.',
      'At least 30 minutes before an optional open-water dive.',
      '可选开放水域潜水前，至少训练 30 分钟。',
    ),
    openWater: L(
      'Дополнительное погружение с инструктором; не обязательно.',
      'Optional dive with an instructor.',
      '可选教练陪同的开放水域潜水。',
    ),
    maxDepth: L(
      'До 9 м в открытой воде, под контролем инструктора.',
      'Up to 9 m in open water, under instructor supervision.',
      '开放水域最深 9 米，全程由教练监督。',
    ),
    price,
    includes: L(
      'Знакомство с дайвингом и базовые навыки. Не заменяет сертификат Open Water.',
      'Scuba introduction and basic skills; not an Open Water certification.',
      '潜水体验及基本技能；不等同于开放水域认证。',
    ),
    location: L(
      'Бассейн / закрытая вода; открытая вода — дополнительно. Площадку согласуем до записи.',
      'Confined water; optional open water. Venue agreed before booking.',
      '平静水域；开放水域为可选。报名之前确认地点。',
    ),
  },
  'open-water-scuba-diver': {
    minimumAge: L(
      'С 18 лет; 10–17 — с письменным согласием родителей. В 10–14 лет — Junior.',
      '18; ages 10–17 need written parental consent. Ages 10–14: Junior.',
      '18 岁；10–17 岁须家长书面同意。10–14 岁为青少年认证。',
    ),
    prerequisites: L(
      'Опыт не нужен. Плавание: 200 м или 300 м с маской, трубкой и ластами; 10 минут на поверхности.',
      'No experience required. Swim 200 m or 300 m with snorkel equipment; float for 10 minutes.',
      '无需经验。游泳 200 米或带浮潜装备游 300 米；漂浮 10 分钟。',
    ),
    loggedDives: L(
      'Опыт погружений не требуется.',
      'No previous dives required.',
      '不要求潜水经验。',
    ),
    duration: L(
      'SDI рекомендует 20 часов; календарный график согласуется отдельно.',
      'SDI recommends 20 hours; calendar schedule agreed separately.',
      'SDI 建议 20 小时；具体日程另行确认。',
    ),
    theory: L(
      'Среда, физика и физиология, снаряжение, компьютер, планирование и безопасность.',
      'Environment, physics, physiology, equipment, computers, planning and safety.',
      '环境、物理、生理、装备、电脑表、计划与安全。',
    ),
    confinedWater: L(
      'Освоение базовых навыков, плавучести, работы в паре и аварийных действий.',
      'Core skills, buoyancy, buddy procedures and emergency responses.',
      '基本技能、浮力、潜伴配合及应急技能。',
    ),
    openWater: L(
      'Минимум 4 погружения, суммарно не менее 80 минут; максимум 3 в день.',
      'At least 4 dives, 80 minutes total; no more than 3 per day.',
      '至少 4 次潜水，合计至少 80 分钟；每天最多 3 次。',
    ),
    maxDepth: L(
      'До 18 м. Для Junior действуют ограничения по сопровождению.',
      'Up to 18 m; Junior divers have supervision restrictions.',
      '最深 18 米；青少年潜水员须遵守陪同要求。',
    ),
    price,
    includes: L(
      'Теория, практика и оценка навыков; сертификат SDI при выполнении всех требований.',
      'Academics, practice and assessment; SDI certification on meeting all requirements.',
      '理论、实践与考核；满足全部要求后获得 SDI 认证。',
    ),
    location: poolLocation,
  },
  'advanced-adventure-diver': {
    minimumAge: age10,
    prerequisites: openWater,
    loggedDives: noDiveMinimum,
    duration: L(
      '5 учебных погружений и теория выбранных направлений.',
      '5 training dives plus selected specialty academics.',
      '5 次训练潜水及所选专项的理论学习。',
    ),
    theory: L(
      'Глубокие погружения, навигация и три дополнительных направления.',
      'Deep diving, navigation and three additional specialties.',
      '深潜、导航及另外三个专项。',
    ),
    confinedWater: noPool,
    openWater: L(
      '5 погружений: глубокое, навигационное и 3 по выбранным специализациям.',
      '5 dives: deep, navigation and 3 selected specialty dives.',
      '5 次潜水：深潜、导航及 3 次所选专项潜水。',
    ),
    maxDepth: L(
      'До 30 м; в возрасте 10–14 лет — до 21 м.',
      'Up to 30 m; ages 10–14: up to 21 m.',
      '最深 30 米；10–14 岁最深 21 米。',
    ),
    price,
    includes: L(
      'Сертификат Advanced Adventure; знакомство со специализациями, без полной сертификации каждой.',
      'Advanced Adventure certification; specialty introductions, not full individual specialty certifications.',
      '进阶探险认证；体验各专项，不授予每项的完整专项认证。',
    ),
    location: waterLocation,
  },
  'deep-diver': {
    minimumAge: age10,
    prerequisites: openWater,
    loggedDives: noDiveMinimum,
    duration: L(
      '2 погружения и теория; график зависит от условий и подготовки.',
      '2 dives plus academics; schedule depends on conditions and skills.',
      '2 次潜水及理论；日程取决于环境和技能水平。',
    ),
    theory: L(
      'Глубинные риски, расход газа, наркоз, компьютер и аварийное планирование.',
      'Depth-related risks, gas use, narcosis, computers and emergency planning.',
      '深度风险、耗气、氮醉、电脑表及应急计划。',
    ),
    confinedWater: noPool,
    openWater: L(
      '2 погружения: первое до 30 м, второе до 40 м; для Junior — возрастной лимит.',
      '2 dives: first up to 30 m, second up to 40 m; Junior depth limits apply.',
      '2 次潜水：首次最深 30 米，第二次最深 40 米；青少年遵守年龄限制。',
    ),
    maxDepth: L(
      'До 40 м; в возрасте 10–14 лет — до 21 м.',
      'Up to 40 m; ages 10–14: up to 21 m.',
      '最深 40 米；10–14 岁最深 21 米。',
    ),
    price,
    includes: L(
      'Планирование и практика глубоких погружений; специализация SDI Deep Diver.',
      'Deep-dive planning and practice; SDI Deep Diver specialty.',
      '深潜计划与实践；SDI 深潜专项认证。',
    ),
    location: waterLocation,
  },
  'underwater-navigation-diver': {
    minimumAge: age10,
    prerequisites: openWater,
    loggedDives: noDiveMinimum,
    duration: L(
      '2 погружения, теория и наземная практика навигации.',
      '2 dives, academics and surface navigation practice.',
      '2 次潜水、理论及水面导航练习。',
    ),
    theory: L(
      'Компас, естественные ориентиры, оценка расстояния и построение маршрута.',
      'Compass, natural references, distance estimation and route planning.',
      '指南针、自然参照物、距离估算及路线计划。',
    ),
    confinedWater: L(
      'Не обязательно; маршруты сначала отрабатываются на поверхности.',
      'Not required; routes are rehearsed on the surface first.',
      '不要求；先在水面练习路线。',
    ),
    openWater: L(
      '2 погружения: возврат к точке, квадрат, треугольник и поиск ориентиров.',
      '2 dives: out-and-back, square, triangle and locating reference points.',
      '2 次潜水：往返、方形、三角形路线及寻找参照点。',
    ),
    maxDepth: certifiedDepth,
    price,
    includes: L(
      'Навигационные навыки и специализация SDI Underwater Navigation.',
      'Navigation skills and SDI Underwater Navigation specialty.',
      '导航技能及 SDI 水下导航专项认证。',
    ),
    location: waterLocation,
  },
  'night-limited-visibility-diver': {
    minimumAge: age10,
    prerequisites: openWater,
    loggedDives: noDiveMinimum,
    duration: L(
      '2 погружения и теория ночного дайвинга.',
      '2 dives plus night-diving academics.',
      '2 次潜水及夜潜理论。',
    ),
    theory: L(
      'Основной и резервный свет, сигналы, навигация и контакт с напарником.',
      'Primary and backup lights, signals, navigation and buddy contact.',
      '主灯与备用灯、信号、导航及潜伴联系。',
    ),
    confinedWater: noPool,
    openWater: L(
      '2 погружения ночью или при ограниченной видимости, с использованием света.',
      '2 dives at night or in limited visibility, using dive lights.',
      '使用潜水灯进行 2 次夜潜或低能见度潜水。',
    ),
    maxDepth: certifiedDepth,
    price,
    includes: L(
      'Практика работы со светом и специализация SDI Night / Limited Visibility.',
      'Light-handling practice and SDI Night / Limited Visibility specialty.',
      '灯光使用练习及 SDI 夜潜／低能见度专项认证。',
    ),
    location: waterLocation,
  },
  'rescue-diver': {
    minimumAge: L(
      'С 18 лет; с 10 — с согласием родителей. До 15 лет — Junior Rescue.',
      '18; from 10 with parental consent. Under 15: Junior Rescue.',
      '18 岁；10 岁起须家长同意。15 岁以下为青少年救援认证。',
    ),
    prerequisites: L(
      'Advanced Adventure или Open Water + 15 погружений; действующие первая помощь, СЛР и кислородная помощь (где разрешено).',
      'Advanced Adventure or Open Water + 15 dives; current first aid, CPR and oxygen-provider certification where permitted.',
      '进阶探险或开放水域加 15 次潜水；有效急救、心肺复苏及法规允许的供氧认证。',
    ),
    loggedDives: L(
      '15 для поступления с Open Water; с Advanced Adventure отдельный минимум не установлен.',
      '15 with Open Water; no separate minimum with Advanced Adventure.',
      '持开放水域认证须 15 次；持进阶探险认证未另设次数要求。',
    ),
    duration: L(
      'SDI рекомендует 12 часов, из них 8 — в открытой воде.',
      'SDI recommends 12 hours, including 8 in open-water conditions.',
      'SDI 建议 12 小时，其中 8 小时在开放水域环境。',
    ),
    theory: L(
      'Профилактика происшествий, стресс, помощь дайверу и аварийный план.',
      'Accident prevention, stress, diver assistance and emergency planning.',
      '事故预防、压力、潜水员救助及应急计划。',
    ),
    confinedWater: L(
      'Отработка самоспасения и помощи перед комплексными сценариями.',
      'Self-rescue and assistance drills before complete scenarios.',
      '综合情境演练之前练习自救和救助技能。',
    ),
    openWater: L(
      'Поиск, помощь и комплексные спасательные сценарии; рекомендовано 8 часов.',
      'Search, assistance and complete rescue scenarios; 8 hours recommended.',
      '搜索、救助及综合救援情境；建议 8 小时。',
    ),
    maxDepth: certifiedDepth,
    price,
    includes: L(
      'Оценка спасательных навыков и сертификат Rescue Diver; первая помощь оформляется отдельным курсом.',
      'Rescue assessment and Rescue Diver certification; first aid is a separate course.',
      '救援技能考核及救援潜水员认证；急救为独立课程。',
    ),
    location: poolLocation,
  },
  'dry-suit-diver': {
    minimumAge: age12,
    prerequisites: openWater,
    loggedDives: noDiveMinimum,
    duration: L(
      'Подготовительное занятие, 2 погружения и теория.',
      'Preparatory water session, 2 dives and academics.',
      '准备性水中训练、2 次潜水及理论。',
    ),
    theory: L(
      'Типы костюмов, утепление, клапаны, уход и нештатные ситуации.',
      'Suit types, insulation, valves, care and emergencies.',
      '干衣类型、保暖、阀门、维护及紧急情况。',
    ),
    confinedWater: L(
      '1 обязательное занятие в бассейне, закрытой или мелкой открытой воде до погружений.',
      '1 required pool, confined-water or shallow-water session before the dives.',
      '潜水之前必须进行 1 次泳池、平静水域或浅水训练。',
    ),
    openWater: L(
      '2 погружения: плавучесть, трим, клапаны и аварийные процедуры.',
      '2 dives: buoyancy, trim, valves and emergency procedures.',
      '2 次潜水：浮力、姿态、阀门及应急技能。',
    ),
    maxDepth: certifiedDepth,
    price,
    includes: L(
      'Практика в сухом костюме и специализация SDI Dry Suit Diver.',
      'Dry-suit practice and SDI Dry Suit Diver specialty.',
      '干衣实践及 SDI 干衣潜水专项认证。',
    ),
    location: poolLocation,
  },
  refresher: {
    minimumAge: L(
      'По возрастным ограничениям имеющегося сертификата.',
      'Subject to the age restrictions of your existing certification.',
      '遵守已有认证的年龄限制。',
    ),
    prerequisites: L(
      'Open Water или эквивалент любой признанной организации.',
      'Open Water or equivalent from a recognized agency.',
      '任何认可机构的开放水域或同等认证。',
    ),
    loggedDives: noDiveMinimum,
    duration: L('Рекомендовано 4 часа.', '4 hours recommended.', '建议 4 小时。'),
    theory: L(
      'Повторение планирования и безопасности.',
      'Planning and safety review.',
      '复习计划与安全。',
    ),
    confinedWater: L(
      'Восстановление базовых навыков в бассейне или открытой воде.',
      'Core-skills review in confined or open water.',
      '在平静或开放水域复习基本技能。',
    ),
    openWater: L(
      '1 погружение в закрытой или открытой воде; второе необязательно.',
      '1 confined- or open-water dive; second dive optional.',
      '1 次平静或开放水域潜水；第 2 次可选。',
    ),
    maxDepth: L(
      'До 18 м, в пределах имеющегося допуска.',
      'Up to 18 m within existing certification.',
      '最深 18 米，遵守现有认证限制。',
    ),
    price,
    includes: L(
      'Повторение навыков, отметка в логбуке или карта Refresher; квалификация не повышается.',
      'Skills review, logbook sign-off or Refresher card; no certification upgrade.',
      '技能复习、日志签署或复习卡；不提升认证等级。',
    ),
    location: L(
      'Бассейн / закрытая или открытая вода; место согласуем до записи.',
      'Confined or open water; venue agreed before booking.',
      '平静或开放水域；报名之前确认地点。',
    ),
  },
  divemaster: {
    minimumAge: L('С 18 лет.', '18 or older.', '18 岁及以上。'),
    prerequisites: L(
      'Advanced Adventure и Rescue или эквиваленты; опыт глубоких, навигационных и ночных погружений; действующие первая помощь, СЛР и кислородная помощь.',
      'Advanced Adventure and Rescue or equivalents; deep, navigation and night experience; current first aid, CPR and oxygen-provider credentials.',
      '进阶探险与救援或同等认证；深潜、导航与夜潜经验；有效急救、心肺复苏及供氧资质。',
    ),
    loggedDives: L(
      '40 при поступлении; к выпуску 60 либо 50 с общим временем под водой 25 часов.',
      '40 to enroll; 60 to graduate, or 50 with 25 underwater hours.',
      '入学须 40 次；毕业须 60 次，或 50 次且水下累计 25 小时。',
    ),
    duration: L(
      'Минимум 40 часов; не менее 30 — под прямым руководством инструктора.',
      'At least 40 hours; at least 30 directly supervised by the instructor.',
      '至少 40 小时，其中至少 30 小时由教练直接监督。',
    ),
    theory: L(
      'Физика, физиология, стандарты SDI, управление рисками и организация группы.',
      'Physics, physiology, SDI standards, risk management and group leadership.',
      '物理、生理、SDI 标准、风险管理与团队领导。',
    ),
    confinedWater: L(
      'Плавательные нормативы, демонстрация навыков и спасательные упражнения.',
      'Swimming tests, demonstration-quality skills and rescue exercises.',
      '游泳测试、示范级技能及救援练习。',
    ),
    openWater: L(
      'Минимум 10 погружений; ведение минимум 4 погружений и 5 брифингов / дебрифингов.',
      'At least 10 dives; guide at least 4 dives and give 5 briefs/debriefs.',
      '至少 10 次潜水；带领至少 4 次潜水并完成 5 次简报／复盘。',
    ),
    maxDepth: L(
      'Учебные погружения до 40 м; в пределах квалификации.',
      'Training dives up to 40 m, within certification.',
      '训练潜水最深 40 米，并遵守认证限制。',
    ),
    price,
    includes: L(
      'Оценка профессиональных навыков; квалификация SDI Divemaster после выполнения требований.',
      'Professional-skills assessment; SDI Divemaster qualification on meeting requirements.',
      '专业技能考核；满足要求后获得 SDI 潜水长资质。',
    ),
    location: poolLocation,
  },
  'intro-to-tech': {
    minimumAge: age15,
    prerequisites: L(
      'SDI Open Water или эквивалент.',
      'SDI Open Water or equivalent.',
      'SDI 开放水域或同等认证。',
    ),
    loggedDives: L(
      'Не менее 25 погружений в открытой воде.',
      'At least 25 logged open-water dives.',
      '至少 25 次有记录的开放水域潜水。',
    ),
    duration: L(
      'Минимум 6 часов теории и брифингов, плюс 3 погружения.',
      'At least 6 academic/briefing hours, plus 3 dives.',
      '至少 6 小时理论与简报，加 3 次潜水。',
    ),
    theory: L(
      'Конфигурация, планирование газа, трим, командные и аварийные процедуры.',
      'Configuration, gas planning, trim, team and emergency procedures.',
      '装备配置、气体计划、姿态、团队与应急技能。',
    ),
    confinedWater: L(
      'Не обязательно; подготовительные упражнения — по плану инструктора.',
      'Not required; preparatory drills as planned by the instructor.',
      '不要求；准备性练习由教练安排。',
    ),
    openWater: L(
      'Минимум 3 бездекомпрессионных погружения.',
      'At least 3 no-decompression dives.',
      '至少 3 次免减压潜水。',
    ),
    maxDepth: L(
      'До 23 м, не глубже имеющегося допуска; без декомпрессии.',
      'Up to 23 m within existing certification; no decompression.',
      '最深 23 米且不超出现有认证；免减压。',
    ),
    price,
    includes: L(
      'Технические базовые навыки и сертификат TDI Intro to Tech; без декомпрессионного допуска.',
      'Technical foundations and TDI Intro to Tech certification; no decompression qualification.',
      '技术基础及 TDI 技术入门认证；不授予减压资格。',
    ),
    location: waterLocation,
  },
  nitrox: {
    minimumAge: age15,
    prerequisites: L(
      'Open Water или текущее обучение на Open Water.',
      'Open Water certification or current enrollment in an Open Water course.',
      '开放水域认证，或正在学习开放水域课程。',
    ),
    loggedDives: noDiveMinimum,
    duration: L(
      'TDI рекомендует 3 часа теории и практику анализа смеси.',
      'TDI recommends 3 academic hours plus gas-analysis practice.',
      'TDI 建议 3 小时理论，加气体分析练习。',
    ),
    theory: L(
      'EAN22–40, кислородная экспозиция, MOD, EAD, компьютер и маркировка.',
      'EAN22–40, oxygen exposure, MOD, EAD, computers and labeling.',
      'EAN22–40、氧暴露、MOD、EAD、电脑表与标识。',
    ),
    confinedWater: L(
      'Не требуется; анализ смеси выполняется на поверхности.',
      'Not required; gas analysis takes place on the surface.',
      '不要求；气体分析在水面进行。',
    ),
    openWater: L(
      'Не обязательно; рекомендованы 2 погружения на Nitrox.',
      'Not required; 2 nitrox dives recommended.',
      '不要求；建议 2 次高氧潜水。',
    ),
    maxDepth: L(
      'В пределах сертификации и MOD смеси; без декомпрессии.',
      'Within certification and gas MOD; no decompression.',
      '遵守认证深度及气体 MOD；免减压。',
    ),
    price,
    includes: L(
      'Практика анализа, экзамен и сертификат TDI Nitrox для EAN22–40.',
      'Gas-analysis practice, exam and TDI Nitrox certification for EAN22–40.',
      '气体分析实践、考试及 EAN22–40 的 TDI 高氧认证。',
    ),
    location: L(
      'Теория и анализ смеси на поверхности; место и даты согласуем до записи.',
      'Academics and surface gas analysis; venue and dates agreed before booking.',
      '理论及水面气体分析；报名之前确认地点与日期。',
    ),
  },
  'advanced-nitrox': {
    minimumAge: age15,
    prerequisites: L(
      'TDI Nitrox Diver или эквивалент.',
      'TDI Nitrox Diver or equivalent.',
      'TDI 高氧潜水员或同等认证。',
    ),
    loggedDives: L(
      'Не менее 25 погружений в открытой воде.',
      'At least 25 logged open-water dives.',
      '至少 25 次有记录的开放水域潜水。',
    ),
    duration: L(
      'Минимум 6 часов теории и брифингов, плюс 4 погружения.',
      'At least 6 academic/briefing hours, plus 4 dives.',
      '至少 6 小时理论与简报，加 4 次潜水。',
    ),
    theory: L(
      'Смеси EAN21–100, кислородные риски, газовое планирование и процедуры смены газа.',
      'EAN21–100, oxygen risks, gas planning and gas-switch procedures.',
      'EAN21–100、氧风险、气体计划及换气程序。',
    ),
    confinedWater: L(
      'Не обязательно; подготовительные упражнения — по плану инструктора.',
      'Not required; preparatory drills as planned by the instructor.',
      '不要求；准备性练习由教练安排。',
    ),
    openWater: L(
      'Минимум 4 погружения; суммарное время на дне не менее 100 минут.',
      'At least 4 dives; at least 100 minutes total bottom time.',
      '至少 4 次潜水；累计水底时间至少 100 分钟。',
    ),
    maxDepth: L(
      'До 40 м в пределах квалификации и MOD; без плановой ступенчатой декомпрессии.',
      'Up to 40 m within certification and MOD; no planned staged decompression.',
      '最深 40 米，遵守认证及 MOD；不进行计划性分阶段减压。',
    ),
    price,
    includes: L(
      'Сертификат TDI Advanced Nitrox; декомпрессионный допуск требует отдельного обучения.',
      'TDI Advanced Nitrox certification; decompression qualification requires separate training.',
      'TDI 进阶高氧认证；减压资格须另行培训。',
    ),
    location: waterLocation,
  },
} satisfies Record<string, CourseDetails>;

const base = 'https://www.tdisdi.com/wp-content/uploads/files/sandp/currentYear/';
export const trainingStandards: Record<keyof typeof trainingDetails, string> = {
  'scuba-discovery':
    base + 'SDI/part%202/pdf/individual/SDI%20Diver%20Standards_04_Scuba_Discovery.pdf',
  'open-water-scuba-diver':
    base + 'SDI/part%202/pdf/individual/SDI%20Diver%20Standards_07_Open_Water_Scuba_Diver.pdf',
  'advanced-adventure-diver': base + 'SDI/part%203/pdf/individual/04_Advanced_Adventure_Diver.pdf',
  'deep-diver': base + 'SDI/part%203/pdf/individual/11_Deep_Diver.pdf',
  'underwater-navigation-diver':
    base + 'SDI/part%203/pdf/individual/26_Underwater_Navigation_Diver.pdf',
  'night-limited-visibility-diver': base + 'SDI/part%203/pdf/individual/19_Night_Low_Vis_Diver.pdf',
  'rescue-diver': base + 'SDI/part%202/pdf/individual/SDI%20Diver%20Standards_11_Rescue_Diver.pdf',
  'dry-suit-diver': base + 'SDI/part%203/pdf/individual/14_Dry_Suit_Diver.pdf',
  refresher: base + 'SDI/complete_sections/Part%202-SDI%20Diver%20Standards.pdf#page=47',
  divemaster: base + 'SDI/part%204/pdf/individual/SDI%20Leadership%20Standards_03_Divemaster.pdf',
  'intro-to-tech':
    base + 'TDI/part%202/pdf/individual/TDI%20Diver%20Standards_03_Intro_to_Tech_Diver.pdf',
  nitrox: base + 'TDI/part%202/pdf/individual/TDI%20Diver%20Standards_06_Nitrox_Diver.pdf',
  'advanced-nitrox':
    base + 'TDI/part%202/pdf/individual/TDI%20Diver%20Standards_07_Advanced_Nitrox_Diver.pdf',
};
