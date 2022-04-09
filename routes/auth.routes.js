const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const authContoller = require('../controllers/auth.controller');
    
    router.post('/login', authContoller.login);
    /**
     * @swagger
     * /api/auth/login:
     *  post:
     *      summary: Аутентификация пользователя
     *      description: Аутентификация пользователя на сайте
     *      tags:
     *          - auth
     *  parameters:
     *      - name: data
     *        in: body
     *        description: Данные для входа
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              phone:
     *                  type: string
     *                  description: Номер телефона
     *                  example: +7 (999) 999 99-99
     *                  required: true
     *              password:
     *                  type: string
     *                  description: Пароль
     *                  example: 12qwer34
     *                  required: true
     *              fingerptint:
     *                  type: string
     *                  description: Уникальный идентификатор конфигураций веб-браузера и операционной системы
     *                  example: 13a2108136591rd1gbv367602f1m740t
     *                  required: true
     */

    router.post('/refreshTokens', authContoller.refreshTokens);
    /**
     * @swagger
     * /api/auth/refreshTokens:
     *  post:
     *      summary: Обновление токенов
     *      description: Актуализация токена доступа и токена обновления
     *      tags:
     *          - auth
     *  parameters:
     *      - name: refreshToken
     *        in: cookies
     *        description: Токен обновления
     *        required: true
     *        schema:
     *          type: string
     *          example: 4rgu37si-1593-0752-0j1l-29qxpt49z374
     */

    router.get('/logout', middlewares.isAuthorized, authContoller.logout);
    /**
     * @swagger
     * /api/auth/logout:
     *  get:
     *      summary: Выход из системы
     *      description: Выход из системы с удалением сессии
     *      tags:
     *          - auth
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     *      - name: refreshToken
     *        in: cookies
     *        description: Токен обновления
     *        required: true
     *        schema:
     *          type: string
     *          example: 4rgu37si-1593-0752-0j1l-29qxpt49z374
     */

    app.use('/api/auth', router);
};