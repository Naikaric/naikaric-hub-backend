const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const userContoller = require('../controllers/user.controller');

    router.post('', userContoller.create);
    /**
     * @swagger
     * /api/user:
     *  post:
     *      summary: Регистрация пользователя
     *      description: Регистрация пользователя на сайте
     *      tags:
     *          - user
     *  parameters:
     *      - name: data
     *        in: body
     *        description: Данные для регистрации
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              name:
     *                  type: string
     *                  description: Имя
     *                  example: Никита
     *                  required: true
     *              surname:
     *                  type: string
     *                  description: Фамилия
     *                  example: Чурилин
     *                  required: true
     *              patronymic:
     *                  type: string
     *                  description: Отчество
     *                  example: Дмитриевич
     *                  required: false
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
     */

    router.get('/:id', middlewares.isAuthorized, userContoller.get);
    /**
     * @swagger
     * /api/user/:id:
     *  get:
     *      summary: Получение пользователя
     *      description: Получение данных о пользователе по его ID
     *      tags:
     *          - user
     *  parameters:
     *      - name: refreshToken
     *        in: cookies
     *        description: Токен обновления
     *        required: true
     *        schema:
     *          type: string
     *          example: 4rgu37si-1593-0752-0j1l-29qxpt49z374
     *      - name: id
     *        in: params
     *        description: ID пользователя
     *        required: true
     *        schema:
     *          type: string
     *          example: 4
     */

    router.put('/:id', middlewares.isAuthorized, userContoller.update);
    /**
     * @swagger
     * /api/user/:id:
     *  put:
     *      summary: Обновление данных пользователя
     *      description: Обновление данных пользователя по его ID
     *      tags:
     *          - user
     *  parameters:
     *      - name: refreshToken
     *        in: cookies
     *        description: Токен обновления
     *        required: true
     *        schema:
     *          type: string
     *          example: 4rgu37si-1593-0752-0j1l-29qxpt49z374
     *      - name: id
     *        in: params
     *        description: ID пользователя
     *        required: true
     *        schema:
     *          type: string
     *          example: 4
     *      - name: data
     *        in: body
     *        description: Данные для регистрации
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              name:
     *                  type: string
     *                  description: Имя
     *                  example: Никита
     *                  required: true
     *              surname:
     *                  type: string
     *                  description: Фамилия
     *                  example: Чурилин
     *                  required: true
     *              patronymic:
     *                  type: string
     *                  description: Отчество
     *                  example: Дмитриевич
     *                  required: false
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
     */

    router.delete('/:id', middlewares.isAuthorized, userContoller.delete);
    /**
     * @swagger
     * /api/user/:id:
     *  delete:
     *      summary: Удаление пользователя
     *      description: Удаление пользователя по его ID
     *      tags:
     *          - user
     *  parameters:
     *      - name: refreshToken
     *        in: cookies
     *        description: Токен обновления
     *        required: true
     *        schema:
     *          type: string
     *          example: 4rgu37si-1593-0752-0j1l-29qxpt49z374
     *      - name: id
     *        in: params
     *        description: ID пользователя
     *        required: true
     *        schema:
     *          type: string
     *          example: 4
     */

    app.use('/api/user', router);
};