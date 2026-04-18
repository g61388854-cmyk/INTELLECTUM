# INTELLECTUM

Минималистичная витрина детализированных промптов. Для каждой работы — референсное изображение и полный JSON-промпт. Внутри: лупа на 2×, «живые» кнопки, копирование в один клик, мягкие анимации.

## Как добавить новый промпт

1. Положите изображение в `assets/images/` (или возьмите внешний URL).
2. Откройте `assets/js/data.js` и добавьте объект в массив `window.PROMPTS`:

```js
{
  id: "unique-slug",
  title: "Название",
  subtitle: "Короткое описание",
  category: "portrait",         // portrait | product | editorial
  tag: "Portrait · Reference Lock",
  image: "assets/images/your-file.jpg",
  imageAlt: "alt-текст",
  meta: ["4K", "nano-banana-pro"],
  prompt: { /* весь JSON-промпт */ }
}
```

3. Обновите страницу. Всё.

## Локальный запуск

Любой статический сервер:

```
python3 -m http.server 8000
# или
npx serve .
```

Открыть `http://localhost:8000`.

## Структура

```
index.html
assets/
  css/styles.css
  js/app.js       # интерактив: лупа, модалка, копирование
  js/data.js      # коллекция промптов
  images/         # референсы
```
