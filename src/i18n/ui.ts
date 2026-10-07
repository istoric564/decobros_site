import type { Loc } from './index';

/** Shared interface texts: header, footer, menus, viewers. */
export const ui = {
  skip: { ru: 'Перейти к содержанию', en: 'Skip to content', zh: '跳到正文' },
  home: { ru: 'Главная', en: 'Home', zh: '首页' },
  homeAria: { ru: 'DECOBROSCREW, главная', en: 'DECOBROSCREW, Home', zh: 'DECOBROSCREW，首页' },
  getInTouch: { ru: 'Связаться', en: 'Get in touch', zh: '联系我们' },
  openMenu: { ru: 'Открыть меню', en: 'Open menu', zh: '打开菜单' },
  closeMenu: { ru: 'Закрыть меню', en: 'Close menu', zh: '关闭菜单' },
  navMain: { ru: 'Основное меню', en: 'Main', zh: '主导航' },
  navMobile: { ru: 'Мобильное меню', en: 'Mobile', zh: '移动导航' },
  navFooter: { ru: 'Меню в подвале', en: 'Footer', zh: '页脚导航' },
  navLegal: { ru: 'Правовые документы', en: 'Legal', zh: '法律信息' },
  language: { ru: 'Язык', en: 'Language', zh: '语言' },
  learnMore: { ru: 'Подробнее', en: 'Learn more', zh: '了解更多' },
  contentRequired: { ru: '[НУЖЕН КОНТЕНТ]', en: '[CONTENT REQUIRED]', zh: '[需要内容]' },
  demo: { ru: 'ДЕМО-КОНТЕНТ', en: 'DEMO CONTENT', zh: '演示内容' },
  imageRequired: { ru: 'НУЖНО ФОТО', en: 'IMAGE REQUIRED', zh: '需要图片' },
  consentLabel: { ru: 'Согласие на cookies', en: 'Cookie consent', zh: 'Cookie 同意' },
  consentText: {
    ru: 'Мы используем cookies Яндекс Метрики и Google Analytics, чтобы понимать, как посетители пользуются сайтом. Счётчики включаются только с вашего согласия.',
    en: 'We use Yandex Metrica and Google Analytics cookies to understand how visitors use the site. They are enabled only with your consent.',
    zh: '我们使用 Yandex Metrica 和 Google Analytics 的 Cookies 来了解访客如何使用本网站。仅在您同意后启用。',
  },
  consentMore: { ru: 'Подробнее', en: 'Learn more', zh: '了解更多' },
  consentAccept: { ru: 'Принять', en: 'Accept', zh: '接受' },
  consentDecline: { ru: 'Отказаться', en: 'Decline', zh: '拒绝' },
  cookieSettings: { ru: 'Настройки cookies', en: 'Cookie settings', zh: 'Cookie 设置' },
  rights: { ru: 'Все права защищены.', en: 'All rights reserved.', zh: '版权所有。' },
  operator: { ru: 'Оператор сайта', en: 'Site operator', zh: '网站运营方' },
  notOffer: {
    ru: 'Информация на сайте носит справочный характер и не является публичной офертой (ст. 437 ГК РФ). Условия услуг согласуются индивидуально.',
    en: 'Information on this site is for reference only and is not a public offer. Terms of service are agreed individually.',
    zh: '本网站信息仅供参考，不构成公开要约。服务条款需单独协商。',
  },
  trademarks: {
    ru: 'SDI и TDI — товарные знаки International Training. Названия и логотипы принадлежат их правообладателям.',
    en: 'SDI and TDI are trademarks of International Training. Names and logos belong to their respective owners.',
    zh: 'SDI 和 TDI 是 International Training 的商标。名称和标志归其各自所有者所有。',
  },
  ageMark: { ru: 'Возрастное ограничение 18+', en: 'Age rating 18+', zh: '年龄限制 18+' },
} satisfies Record<string, Loc>;
