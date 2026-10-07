import type { Loc, Text } from '../i18n';

export type ExpeditionStatus = 'open' | 'planned' | 'full' | 'completed';

export const expeditionStatusLabels: Record<ExpeditionStatus, Loc> = {
  open: { ru: 'Набор открыт', en: 'Booking open', zh: '报名中' },
  planned: { ru: 'Планируется', en: 'Planned', zh: '计划中' },
  full: { ru: 'Мест нет', en: 'Fully booked', zh: '已满员' },
  completed: { ru: 'Завершено', en: 'Completed', zh: '已结束' },
};

export interface Expedition {
  slug: string;
  title: Loc;
  destination: Loc;
  country: Loc;
  type: Loc;
  dates: Loc;
  level: Text;
  status: ExpeditionStatus;
  description: Loc;
  /** Image file base name in src/assets/photos/. Owner supplies the photo. */
  image?: string;
}

/** DEMO CONTENT: replace with real expeditions before launch. */
export const expeditions: Expedition[] = [
  {
    slug: 'red-sea-wrecks-2027',
    title: { ru: 'Рэки Красного моря', en: 'Red Sea Wreck Expedition', zh: '红海沉船探险' },
    destination: { ru: 'Красное море', en: 'Red Sea', zh: '红海' },
    country: { ru: 'Египет', en: 'Egypt', zh: '埃及' },
    type: {
      ru: 'Рэки · Технический · Сафари',
      en: 'Wrecks · Technical · Liveaboard',
      zh: '沉船 · 技术 · 船宿',
    },
    dates: { ru: '14–21 марта 2027', en: 'March 14–21, 2027', zh: '2027 年 3 月 14–21 日' },
    level: 'Advanced / Technical',
    status: 'open',
    description: {
      ru: 'Неделя погружений на знаковых рэках Красного моря. Маршрут ориентирован на опытных рекреационных и технических дайверов. Конкретные объекты и профили определяются условиями и уровнем участников.',
      en: 'A week of dives on the iconic wrecks of the Red Sea. The route is for experienced recreational and technical divers. Exact sites and profiles depend on conditions and the level of the group.',
      zh: '在红海标志性沉船上进行为期一周的潜水。路线面向经验丰富的休闲和技术潜水员。具体潜点和潜水剖面取决于现场条件和参与者水平。',
    },
    image: 'EXP-red-sea',
  },
  {
    slug: 'mexico-cenotes-2027',
    title: { ru: 'Сеноты Мексики', en: 'Mexico Cenotes', zh: '墨西哥天然井' },
    destination: { ru: 'Юкатан', en: 'Yucatán', zh: '尤卡坦' },
    country: { ru: 'Мексика', en: 'Mexico', zh: '墨西哥' },
    type: {
      ru: 'Сеноты · Каверны · Overhead',
      en: 'Cenotes · Cavern · Overhead',
      zh: '天然井 · 洞穴 · 头顶封闭环境',
    },
    dates: { ru: '10–18 мая 2027', en: 'May 10–18, 2027', zh: '2027 年 5 月 10–18 日' },
    level: {
      ru: 'Advanced / соответствующая overhead-квалификация',
      en: 'Advanced / matching overhead qualification',
      zh: '进阶 / 相应的头顶封闭环境资质',
    },
    status: 'open',
    description: {
      ru: 'Экспедиционная поездка по сенотам Юкатана. Программа формируется с учетом квалификации участников и может включать как cavern-маршруты, так и более сложные погружения для подготовленных дайверов.',
      en: 'An expedition to the cenotes of Yucatán. The program follows the qualifications of the group and can include cavern routes as well as more demanding dives for trained divers.',
      zh: '前往尤卡坦天然井的探险之旅。行程根据参与者的资质安排，既可包含洞穴路线，也可为训练有素的潜水员安排更具挑战性的潜水。',
    },
    image: 'EXP-mexico-cenotes',
  },
  {
    slug: 'maldives-liveaboard-2027',
    title: { ru: 'Сафари на Мальдивах', en: 'Maldives Liveaboard', zh: '马尔代夫船宿' },
    destination: { ru: 'Мальдивы', en: 'Maldives', zh: '马尔代夫' },
    country: { ru: 'Мальдивская Республика', en: 'Republic of Maldives', zh: '马尔代夫共和国' },
    type: {
      ru: 'Сафари · Advanced · Пелагика',
      en: 'Liveaboard · Advanced · Pelagic',
      zh: '船宿 · 进阶 · 远洋',
    },
    dates: { ru: '5–12 ноября 2027', en: 'November 5–12, 2027', zh: '2027 年 11 月 5–12 日' },
    level: 'Advanced',
    status: 'planned',
    description: {
      ru: 'Экспедиционный liveaboard с насыщенной программой погружений. Основная идея поездки — сильная команда, хорошие дайв-сайты и гибкое планирование маршрута в зависимости от условий.',
      en: 'An expedition liveaboard with a full dive program. The idea of the trip is a strong team, good dive sites and a flexible route that follows the conditions.',
      zh: '潜水行程丰富的探险船宿。此行的核心是强大的团队、优质的潜点，以及根据条件灵活调整的路线。',
    },
    image: 'EXP-maldives',
  },
  {
    slug: 'philippines-expedition-2028',
    title: { ru: 'Экспедиция на Филиппины', en: 'Philippines Expedition', zh: '菲律宾探险' },
    destination: { ru: 'Палаван', en: 'Palawan', zh: '巴拉望' },
    country: { ru: 'Филиппины', en: 'Philippines', zh: '菲律宾' },
    type: {
      ru: 'Рифы · Рэки · Исследование',
      en: 'Reefs · Wrecks · Exploration',
      zh: '珊瑚礁 · 沉船 · 探索',
    },
    dates: { ru: '12–22 февраля 2028', en: 'February 12–22, 2028', zh: '2028 年 2 月 12–22 日' },
    level: 'Advanced',
    status: 'planned',
    description: {
      ru: 'Исследовательская поездка с комбинацией рифовых и рэк-погружений. Программа ориентирована на дайверов, которые ценят небольшую команду и насыщенный график погружений.',
      en: 'An exploration trip that combines reef and wreck dives. The program is for divers who value a small team and a busy dive schedule.',
      zh: '结合珊瑚礁与沉船潜水的探索之旅。适合喜欢小团队和紧凑潜水日程的潜水员。',
    },
    image: 'EXP-philippines',
  },
];
