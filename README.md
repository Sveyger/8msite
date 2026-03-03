# March 8 Master Site

Один сайт, два режима:
- Админка (по умолчанию): `index.html`
- Личная страница девушки: `index.html?key=<уникальный_ключ>`

## 1) Вход в админку
1. Откройте `index.html`
2. Код доступа по умолчанию: `M8`
3. После входа создавайте/редактируйте профили и копируйте персональные ссылки для QR.

> Код меняется в `index.html` в константе `ADMIN_CODE`.

## 2) Backend режимы
Сайт поддерживает 2 режима хранения:
- `localStorage` (автоматически, если Supabase не настроен)
- `Supabase` (если заполнены `SUPABASE_URL` и `SUPABASE_ANON_KEY`)

Константы в `index.html`:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_TABLE` (по умолчанию `march8_profiles`)

## 3) Подготовка Supabase
1. Создайте проект в Supabase.
2. В SQL Editor выполните файл `supabase_schema.sql`.
3. В `Project Settings -> API` скопируйте:
   - `Project URL`
   - `anon public key`
4. Вставьте их в `index.html` в `SUPABASE_URL` и `SUPABASE_ANON_KEY`.

## 4) GitHub Pages деплой
1. Запушьте репозиторий на GitHub.
2. В `Settings -> Pages` выберите branch (`main`) и root (`/`).
3. Дождитесь публикации.
4. Проверьте:
   - главная ссылка открывает админку,
   - ссылка `?key=...` открывает персональную страницу.

## 5) Важный момент по безопасности
Текущий вариант — frontend-only (без серверной админ-аутентификации).
- Это удобно для быстрого запуска.
- Но не дает жесткой защиты данных уровня production.

Если нужна строгая модель доступа (невозможность чтения/перебора других профилей), следующим шагом нужен backend-слой (например Edge Function/API с server-side проверкой).
