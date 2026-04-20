# Мастерская лидов

Этот репозиторий публикует Obsidian-vault через Quartz и GitHub Pages.

## Локальный запуск

```bash
npm ci
npm run dev
```

Перед сборкой скрипт `scripts/sync-content.mjs` создаёт временную папку `content/` из заметок в корне vault. Это позволяет сохранить текущую структуру Obsidian-проекта без ручного переноса файлов.

## Публикация в GitHub Pages

GitHub Pages использует workflow `.github/workflows/deploy.yml`.

Для публикации:

1. Создайте новый пустой репозиторий GitHub без `README`.
2. Добавьте URL репозитория как `origin`.
3. Запушьте ветку `main`.
4. В настройках репозитория откройте `Pages` и выберите `GitHub Actions` как source.
