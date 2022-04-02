![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Naikaric/naikaric-hub-backend/master?style=plastic) ![GitHub](https://img.shields.io/github/license/Naikaric/naikaric-hub-backend)

# Naikaric hub: серверная часть
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## Общее
(в планах) Naikaric hub это агрегатор моих проектов, статей и новостей о том, что происходит в моей жизни.

- [Клиентская часть](https://github.com/Naikaric/naikaric-hub-frontend)
- Серверная часть (Вы сейчас здесь)

## Работа с проектом
```sh
npm install
```

Создаём файл **.env**, в котором будут прописаны переменные окружения:
| Название | Значение |
| ------ | ------ |
| DB_NAME | имя бд |
| DB_USER | имя пользователя бд |
| DB_PASSWORD | пароль от пользователя бд |
| DB_HOST | хост бд |
| DB_PORT | порт бд |
| DB_DIALECT | диалект бд |
| PORT | порт, на котором запущен сервер |
| DOMAIN | домен сервера |
| EXPIRATION_TIME_REFRESH_TOKEN | время жизни токена обновления в милисекундах |
| ACCESS_TOKEN_KEY | секретное слово для генерации токена доступа |
| EXPIRATION_TIME_ACCESS_TOKEN | время жизни токена доступа |
| CODE_SECRET_KEY | секретное слово для генерации кода доступа при авторизации через Naikaric hub |
| EXPIRATION_TIME_CODE | время жизни кода доступа при авторизации через Naikaric hub |
| SALT_ROUNDS | соль для генерации токенов |
| ACTIVE_REFRESH_SESSIONS_COUNT | количество сессий пользователя, которые могут существовать одновременно |

Для запуска проекта в режиме разработки используем `npm run dev`, а чтобы запустить продакшен-сервер `npm start`
