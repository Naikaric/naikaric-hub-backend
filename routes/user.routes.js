const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const userContoller = require('../controllers/user.controller');

    router.post('', userContoller.create);
    router.get('/:id', middlewares.isAuthorized, userContoller.get);
    router.put('/:id', middlewares.isAuthorized, userContoller.update);
    router.delete('/:id', middlewares.isAuthorized, userContoller.delete);

    app.use('/api/user', router);
};