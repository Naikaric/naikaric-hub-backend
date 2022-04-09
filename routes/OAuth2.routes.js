const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const OAuth2Controller = require('../controllers/OAuth2.controller');

    router.post('/registerOrigin', middlewares.isAuthorized, OAuth2Controller.registerOrigin);
    /**
     * @swagger
     * /api/OAuth2/registerOrigin:
     *  post:
     *      summary: Регистрация хостов
     *      description: Регистрация сайтов для доступа к аутентификации через Naikaric hub
     *      tags:
     *          - OAuth2
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     *      - name: data
     *        in: body
     *        description: Данные для регистрации
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              host:
     *                  type: string
     *                  description: Адрес хоста
     *                  example: localhost:3001
     *                  required: true
     */

    router.get('/createOAuth2Code', middlewares.isAuthorized, OAuth2Controller.createOAuth2Code);
    /**
     * @swagger
     * /api/OAuth2/createOAuth2Code:
     *  get:
     *      summary: Генерация кода
     *      description: Генерация кода для доступа аутентификации через Naikaric hub
     *      tags:
     *          - OAuth2
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     */

    router.get('/getUserInfo', middlewares.OAuth2HasCode, OAuth2Controller.getUserInfo);
    /**
     * @swagger
     * /api/OAuth2/getUserInfo:
     *  get:
     *      summary: Получение данных пользователя
     *      description: Получение данных пользователя по коду доступа для аутентификации через Naikaric hub
     *      tags:
     *          - OAuth2
     *  parameters:
     *      - name: code
     *        in: headers
     *        description: Код доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     */

    app.use('/api/OAuth2', router);
};