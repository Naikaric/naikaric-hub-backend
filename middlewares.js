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

exports.OAuth2HasCode = async(req, res, next) => {
    try {
        const code = req.headers.code;

        if(code) {
            jwt.verify(code, process.env.CODE_SECRET_KEY, err => {
                if(!err) {
                    next();
                } else {
                    res.json({ error: { type: 'getUserInfo', message: 'Токен скомпрометирован' } });
                }
            });
        } else {
            res.json({ error: { type: 'OAuth2HasCode', message: 'Отсутствует код' } });
        }
    } catch (error) {
        res.json({ error: { type: 'OAuth2HasCode', message: error.message } });
    }
};