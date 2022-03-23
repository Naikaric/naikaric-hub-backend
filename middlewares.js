require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.isAuthorized = async(req, res, next) => {
    try {
        const accessToken = req.headers.accesstoken;

        if(accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, err => {
                if(!err) {
                    next();
                } else {
                    res.json({ error: { type: 'isAuthorized', message: 'Токен скомпрометирован' } });
                }
            });
        } else {
            res.json({ error: { type: 'isAuthorized', message: 'Отсутствует токен' } });
        }
    } catch (error) {
        res.json({ error: { type: 'isAuthorized', message: error.message } });
    }
};