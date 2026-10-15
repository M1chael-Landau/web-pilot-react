# web-pilot-react

Пилот 2: небольшое демонстрационное приложение на **реальном фреймворке** —
Vite + React + TypeScript + Tailwind CSS + shadcn/ui — опубликованное на GitHub Pages.

## Что внутри

- Счётчик на `useState` (доказательство, что JavaScript и состояние живы).
- Переключатель светлой/тёмной темы на `Switch`; выбор сохраняется в `localStorage`.
- Раздел `Tabs` с двумя вкладками.
- `Input` + кнопка, которые повторяют введённый текст.
- Адаптивная вёрстка (проверена на узкой ширине телефона).

Использованные компоненты shadcn/ui: `button`, `card`, `switch`, `tabs`, `input`.

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build   # результат в dist/
npm run preview # локальный просмотр сборки
```

## Публикация

Сайт собирается в `dist/` и публикуется с ветки `gh-pages`.
Базовый путь задан в `vite.config.ts`:

```ts
base: '/web-pilot-react/'
```

Живая версия: https://m1chael-landau.github.io/web-pilot-react/
