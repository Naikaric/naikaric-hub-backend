const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const authContoller = require('../controllers/auth.controller');

    router.post('/login', authContoller.login);
    router.post('/refreshTokens', authContoller.refreshTokens);
    router.get('/logout', middlewares.isAuthorized, authContoller.logout);

    app.use('/api/auth', router);
};