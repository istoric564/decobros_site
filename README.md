# DECOBROSCREW — сайт дайв-клуба

Статический многоязычный сайт (ru / en / zh) на [Astro](https://astro.build): обучение SDI/TDI, экспедиции, команда, галерея, контакты.

**Сайт:** https://istoric564.github.io/decobros_site/

## Быстрый старт

Нужен Node.js 24+.

```sh
npm install
npm run dev        # http://localhost:4321
```

## Команды

| Команда           | Что делает                                      |
| :---------------- | :---------------------------------------------- |
| `npm run dev`     | Локальный сервер разработки                     |
| `npm run build`   | Сборка в `dist/`                                |
| `npm run preview` | Просмотр собранного сайта                       |
| `npm run check`   | Проверка типов (`astro check`)                  |
| `npm run lint`    | ESLint                                          |
| `npm run format`  | Prettier                                        |
| `npm test`        | Playwright-тесты (нужна предварительная сборка) |

## Структура

```text
src/
├── pages/[...locale]/   # страницы; ru без префикса, /en/ и /zh/ — переводы
├── components/          # шапка, футер, герой, галерея, аналитика…
├── layouts/             # BaseLayout: meta, hreflang, OG
├── data/                # контент: курсы, экспедиции, команда, контакты
├── i18n/                # переводы и хелперы (t, localePath, withBase)
└── assets/photos/       # фотографии (оптимизируются при сборке)
public/                  # favicon и прочие файлы «как есть»
deploy/nginx.conf        # конфиг для своего сервера (альтернатива Pages)
tests/                   # Playwright + axe
```

Внутренние ссылки строятся через `localePath(locale, '/path')` — он добавляет языковой префикс и базовый путь деплоя. Файлы из `public/` подключаются через `withBase('/file')`.

## Деплой на GitHub Pages

Деплой автоматический: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) собирает и публикует сайт при каждом пуше в `main`.

Однократная настройка: **Settings → Pages → Source → GitHub Actions**.

Workflow сам передаёт сборке адрес сайта и базовый путь:

| Переменная  | Назначение                                | По умолчанию                   |
| :---------- | :---------------------------------------- | :----------------------------- |
| `SITE_URL`  | Домен (canonical, sitemap, OG)            | `https://decobroscrew.example` |
| `BASE_PATH` | Подпапка сайта, например `/decobros_site` | `/`                            |

При подключении своего домена (**Settings → Pages → Custom domain**) ничего менять не нужно — следующая сборка подхватит новый адрес.

Локальная сборка как на Pages:

```sh
SITE_URL=https://istoric564.github.io BASE_PATH=/decobros_site npm run build
```

(в Git Bash на Windows добавьте `MSYS_NO_PATHCONV=1` перед командой).

## Перед запуском

Список недостающих материалов — в [CONTENT_REQUIREMENTS.md](CONTENT_REQUIREMENTS.md) и [ASSET_REQUIREMENTS.md](ASSET_REQUIREMENTS.md): реальные контакты и юрлицо, ID счётчиков аналитики, фотографии, проверка юридических текстов.
