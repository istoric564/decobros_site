import type { Loc } from '../i18n';

/** DEMO: answers are placeholders. Replace with owner-approved text before launch. */
export interface FaqItem {
  question: Loc;
  answer: Loc<string[]>;
}

export const faq: FaqItem[] = [
  {
    question: {
      ru: 'Нужна ли медицинская справка?',
      en: 'Do I need a medical certificate?',
      zh: '需要体检证明吗？',
    },
    answer: {
      ru: [
        'Да. Для обучения и экспедиций нужна справка от врача о допуске к занятиям дайвингом, выданная не ранее чем за 12 месяцев до начала.',
        'Перед первым погружением каждый участник также заполняет медицинскую анкету. Если в анкете есть отметки «да», потребуется заключение врача.',
      ],
      en: [
        'Yes. Training and expeditions require a doctor’s certificate clearing you for diving, issued no more than 12 months before the start.',
        'Before the first dive every participant also fills in a medical questionnaire. If any answer is “yes”, a doctor’s opinion is required.',
      ],
      zh: [
        '需要。参加培训和探险须提供医生出具的潜水许可证明，开具时间不得早于开始前 12 个月。',
        '首次下潜前，每位参与者还需填写健康问卷。如有任何一项回答为“是”，则需提供医生意见。',
      ],
    },
  },
  {
    question: {
      ru: 'Можно ли нырять в своём снаряжении?',
      en: 'Can I dive in my own gear?',
      zh: '可以使用自己的装备吗？',
    },
    answer: {
      ru: [
        'Конечно. Своё снаряжение должно быть исправно и обслужено: регулятор и компенсатор — с сервисом не старше года, баллон — с действующим освидетельствованием.',
        'Инструктор проверит комплект перед погружением. Если чего-то не хватает, недостающее можно взять в прокат.',
      ],
      en: [
        'Of course. Your gear must be in working order and serviced: regulator and BCD serviced within the last year, cylinder with a valid inspection.',
        'The instructor checks the set before the dive. Anything missing can be rented.',
      ],
      zh: [
        '当然可以。自备装备须状态良好并经过保养：调节器和浮力控制装置的保养时间不超过一年，气瓶须在检验有效期内。',
        '下潜前教练会检查整套装备。缺少的物品可以租用。',
      ],
    },
  },
  {
    question: {
      ru: 'Нужна ли страховка?',
      en: 'Do I need insurance?',
      zh: '需要保险吗？',
    },
    answer: {
      ru: [
        'Да, страховка, покрывающая дайвинг, обязательна для всех курсов и экспедиций. Обычная туристическая страховка подводные погружения, как правило, не покрывает.',
        'Подскажем, какой полис выбрать, — напишите нам до начала поездки.',
      ],
      en: [
        'Yes, insurance that covers diving is required for all courses and expeditions. Standard travel insurance usually does not cover scuba diving.',
        'We can help you choose a policy — write to us before the trip.',
      ],
      zh: [
        '需要。所有课程和探险都必须购买涵盖潜水的保险。普通旅游保险通常不包含水肺潜水。',
        '我们可以帮您选择保单——请在出行前联系我们。',
      ],
    },
  },
  {
    question: {
      ru: 'Что если я не умею плавать?',
      en: 'What if I can’t swim?',
      zh: '不会游泳怎么办？',
    },
    answer: {
      ru: [
        'Начать можно и так. Для первого знакомства подходит пробное погружение в бассейне с инструктором — уметь плавать для него не обязательно.',
        'Для сертификационного курса нужно уверенно держаться на воде. Мы поможем подготовиться в бассейне до начала обучения.',
      ],
      en: [
        'You can still start. A trial dive in the pool with an instructor is a good first step — you don’t need to swim for it.',
        'A certification course requires you to be comfortable in the water. We will help you prepare in the pool before the course.',
      ],
      zh: [
        '依然可以开始。在泳池中由教练陪同的体验潜水是很好的第一步，无需会游泳。',
        '参加认证课程则需要能在水中自如漂浮。我们会在课程开始前帮助您在泳池中做好准备。',
      ],
    },
  },
  {
    question: {
      ru: 'Есть ли прокат снаряжения?',
      en: 'Do you rent gear?',
      zh: '可以租用装备吗？',
    },
    answer: {
      ru: [
        'Да, прокат есть: можно взять полный комплект или отдельные позиции — компенсатор, регулятор, гидрокостюм, маску, ласты.',
        'Стоимость зависит от комплекта и места погружений — уточняйте у нас в Telegram, WhatsApp или по почте.',
      ],
      en: [
        'Yes. You can rent a full set or single items — BCD, regulator, wetsuit, mask, fins.',
        'The price depends on the set and the dive location — ask us on Telegram, WhatsApp or by email.',
      ],
      zh: [
        '可以。您可以租用整套装备或单件——浮力控制装置、调节器、潜水服、面镜、脚蹼。',
        '价格取决于装备组合和潜水地点——请通过 Telegram、WhatsApp 或电子邮件咨询。',
      ],
    },
  },
];
