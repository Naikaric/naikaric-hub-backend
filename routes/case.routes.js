const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const caseController = require('../controllers/case.controller');

    router.post('', middlewares.isAuthorized, caseController.create);
    /**
     * @swagger
     * /api/case:
     *  post:
     *      summary: Создание кейса
     *      description: Создание рабочего кейса
     *      tags:
     *          - case
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
     *        description: Данные для создания кейса
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              title:
     *                  type: string
     *                  description: Заголовок статьи
     *                  example: Заголовок статьи
     *                  required: true
     *              description:
     *                  type: text
     *                  description: Описание статьи
     *                  example: Описание статьи
     *                  required: false
     *              preview:
     *                  type: text
     *                  description: Превью статьи
     *                  example: Превью статьи
     *                  required: false
     *              text:
     *                  type: text
     *                  description: Содержимое статьи
     *                  example: Содержимое статьи
     *                  required: true
     */

    router.get('/getAll', middlewares.isAuthorized, caseController.getAll);
    /**
     * @swagger
     * /api/case/getAll:
     *  get:
     *      summary: Получение кейсов
     *      description: Получение всех рабочих кейсов
     *      tags:
     *          - case
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     */

    router.get('/get/:id', middlewares.isAuthorized, caseController.get);
    /**
     * @swagger
     * /api/case/get/:id:
     *  get:
     *      summary: Получение кейса
     *      description: Получение определённого рабочего кейса по его ID
     *      tags:
     *          - case
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     *      - name: id
     *        in: params
     *        description: ID рабочего кейса
     *        required: true
     *        schema:
     *          type: string
     *          example: 4
     */

    router.put('/update/:id', middlewares.isAuthorized, caseController.update);
    /**
     * @swagger
     * /api/case/update/:id:
     *  put:
     *      summary: Обновление кейса
     *      description: Обновление определённого рабочего кейса по его ID
     *      tags:
     *          - case
     *  parameters:
     *      - name: accesstoken
     *        in: headers
     *        description: Токен доступа
     *        required: true
     *        schema:
     *          type: string
     *          example: 29qxpt49z374-0j1l-1593-0752-4rgu37si
     *      - name: id
     *        in: params
     *        description: ID рабочего кейса
     *        required: true
     *        schema:
     *          type: string
     *          example: 4
     *      - name: data
     *        in: body
     *        description: Данные для обновления кейса
     *        required: true
     *        schema:
     *          type: object
     *          properties:
     *              title:
     *                  type: string
     *                  description: Заголовок статьи
     *                  example: Заголовок статьи
     *                  required: true
     *              description:
     *                  type: text
     *                  description: Описание статьи
     *                  example: Описание статьи
     *                  required: false
     *              preview:
     *                  type: text
     *                  description: Превью статьи
     *                  example: Превью статьи
     *                  required: false
     *              text:
     *                  type: text
     *                  description: Содержимое статьи
     *                  example: Содержимое статьи
     *                  required: true
     */

    app.use('/api/case', router);
};