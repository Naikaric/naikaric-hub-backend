const middlewares = require('../middlewares');

module.exports = app => {
    const router = require('express').Router();
    const OAuth2Controller = require('../controllers/OAuth2.controller');

    router.post('/registerOrigin', middlewares.isAuthorized, OAuth2Controller.registerOrigin);
    router.get('/createOAuth2Code', middlewares.isAuthorized, OAuth2Controller.createOAuth2Code);
    router.get('/getUserInfo', middlewares.OAuth2HasCode, OAuth2Controller.getUserInfo);

    app.use('/api/OAuth2', router);
};