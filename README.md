# UNEC · Elektron xidmətlər haqqında bələdçi (frontend)

React + Vite. Сейчас работает на демо-данных (mock), готов к подключению бэкенда.

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # сборка в папку dist/
```

Демо-вход: `teacher1` (Aygün Məmmədova, преподаватель) или `student1` (Murad Əliyev, студент), пароль любой. Можно ввести и любой другой логин — имя возьмётся из него.

Язык (AZ / EN / RU) переключается в верхней полосе на любой странице и запоминается. Личный кабинет: меню с именем справа вверху → «Hesabım» (`/beledci/hesab`).

## Деплой на Netlify

**Вариант 1 — через GitHub (рекомендую):**
1. Залейте папку в репозиторий GitHub.
2. Netlify → *Add new site → Import an existing project* → выберите репозиторий.
3. Настройки подтянутся из `netlify.toml` (build: `npm run build`, publish: `dist`). Нажмите *Deploy*.

**Вариант 2 — быстро, без Git:**
1. `npm install && npm run build`
2. Перетащите папку `dist` на https://app.netlify.com/drop

Редиректы для React Router уже настроены (`netlify.toml` и `public/_redirects`), поэтому прямые ссылки вида `/beledci/kommunikasiya/forumlar` не дают 404.

## Структура

```
src/
  api/client.js          ← ЕДИНСТВЕННОЕ место, где идёт обращение к бэкенду
  data/guide.js          ← демо-данные на азербайджанском (15 разделов, 131 услуга)
  data/guide.en.js, guide.ru.js ← переводы демо-данных
  i18n/strings.js        ← все тексты интерфейса на AZ/EN/RU
  context/               ← аккаунт и история просмотров, данные справочника, настройки (шрифт, фон)
  components/SiteHeader.jsx, SiteFooter.jsx ← шапка (меню «Bölmələr», поиск, язык, аккаунт) и подвал
  components/CategoryIcon.jsx ← иконки разделов (Phosphor Icons, стиль duotone)
  components/
    FileTree.jsx         ← левое дерево каталога «как файловая система»
    FsRow.jsx            ← раскрывающаяся вниз строка (Adı, Domain, Brief, Haqqında, Video, Slayd)
    VideoPlayer.jsx      ← YouTube или mp4
    SlideViewer.jsx      ← слайды: текстовые, картинки или PDF
  pages/
    LoginPage.jsx        ← вход (дизайн по макету)
    GuideHome.jsx        ← главная (приветствие по имени, оглавление)
    AccountPage.jsx      ← личный кабинет
    VideosPage.jsx       ← все видеоинструкции и слайды (/beledci/videolar)
    CategoryPage.jsx     ← раздел (список услуг)
    ServicePage.jsx      ← карточка услуги
public/
  unec-logo*.jpg, favicon.png
  campus.jpg             ← фон левой панели входа (замените на качественное фото кампуса)
```

## Подключение бэкенда

1. Задайте адрес API: файл `.env` (см. `.env.example`) или в Netlify:
   *Site settings → Environment variables* → `VITE_API_URL=https://api.example.az`
2. Пересоберите сайт. Если `VITE_API_URL` пустой — работает mock.

Токен из логина сохраняется и отправляется в заголовке `Authorization: Bearer <token>`.

### Ожидаемые эндпоинты

| Метод | Путь | Тело / Ответ |
|---|---|---|
| POST | `/auth/login` | `{ username, password }` → `{ token, user: { id, username, fullName, role: "teacher" \| "student" } }` |
| GET | `/auth/me` | `user` (необязательно) |
| PUT | `/auth/me` | `{ fullName, email, faculty, lang }` → `user` |
| GET | `/guide/categories?lang=az\|en\|ru` | `Category[]` (см. ниже) |
| GET | `/guide/services/:id?lang=az\|en\|ru` | `Service` |

Язык передаётся и параметром `?lang=`, и заголовком `Accept-Language`. Бэкенд возвращает тексты (title, name, brief, about, slides) на этом языке.

Объект `user`: `{ id, username, fullName, role: "teacher" | "student", email, faculty }`. По `fullName` сайт приветствует пользователя.

```jsonc
// Category
{
  "id": "telim-fealiyyetleri",
  "number": 4,
  "title": "Təlim fəaliyyətləri",
  "subtitle": "Activities",
  "description": "…",
  "services": [ /* Service (about/video/slides можно не отдавать в списке) */ ]
}

// Service
{
  "id": "tapsiriq",
  "name": "Tapşırıq",                         // Adı
  "domain": "moodle.unec.edu.az/mod/assign",  // Domain
  "brief": "Qısa təsvir",                     // Brief
  "about": "Ətraflı mətn. Abzaslar \n\n ilə ayrılır.", // Haqqında
  "video":  { "title": "…", "type": "youtube" | "file", "url": "…" },   // необязательно
  "slides": { "title": "…", "type": "inline", "items": [{ "title": "…", "text": "…" }] }
          // или { "type": "images", "items": [{ "src": "…" }] }
          // или { "type": "pdf", "url": "…/deck.pdf" }                    // необязательно
}
```

Если у услуги нет `video` или `slides`, соответствующий блок просто не показывается.

## Примечания

- Домен `moodle.unec.edu.az` в демо-данных — пример; поменяйте `PLATFORM_DOMAIN` в `src/data/guide.js` или отдавайте реальные значения с бэкенда.
- Видео в демо — тестовый ролик-заглушка.
- Для удобства старших преподавателей: размер текста (A− / A+) и тёмный фон в верхней полосе, крупные кликабельные зоны, поиск с учётом букв ə/ı/ö/ü/ş/ç/ğ.
- Шрифты: Montserrat (заголовки) и Source Sans 3 (текст), встроены в проект через @fontsource — Google Fonts не нужны. Иконки — Phosphor Icons (@phosphor-icons/react).
- Список «Ən çox istifadə olunanlar» на главной задаётся в `src/i18n/strings.extra.js` (массив POPULAR).
