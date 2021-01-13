# Список контактов

##### Проект представляет собой небольшое SPA с авторизацией через [json-server](https://github.com/typicode/json-server)

##### Для запуска приложения Вам следует:
1. Проверить наличие на компьютере установленных ![node.js](https://img.shields.io/badge/nodejs-555?style=for-the-badge&logo=node.js) и ![npm](https://img.shields.io/badge/npm-555?style=for-the-badge&logo=npm) командой `node -v` и `npm -v`. При необходимости выполните [установку](https://nodejs.org/)
2. Клонировать проект к себе на компьютер: `git clone https://github.com/dymov-ant/contact-list.git`
3. Перейти в папку с проектом: `cd contact-list`
4. Выполнить скрипт `npm install` для установки зависимостей
5. Выполнить скрипт `npm run dev` для запуска приложения вместе с json-server
6. Приложение запустится по адресу `http://localhost:3000`.
---

#### Список пользователей для авторизации:

```json
{
  "users": [
    {
      "id": 1,
      "email": "test1@mail.ru",
      "password": "123123"
    },
    {
      "id": 2,
      "email": "test2@mail.ru",
      "password": "123123"
    },
    {
      "id": 3,
      "email": "test3@mail.ru",
      "password": "123123"
    }
  ]
}
```
