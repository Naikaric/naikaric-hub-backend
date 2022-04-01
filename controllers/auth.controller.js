require('dotenv').config();

const db = require('../models');
const User = db.users;
const RefreshSession = db.refreshSessions;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async(req, res) => {
    try {
        const { phone, password, fingerprint } = req.body.data;

        const computedUser = await User.findOne({ where: { phone }});
        const user = await User.findOne({ where: { phone }, attributes: { exclude: ['createdAt', 'id', 'password', 'updatedAt'] } });

        if(computedUser) {
            const isValidPassword = await bcrypt.compare(password, computedUser.password);

            if(isValidPassword) {
                const expiresIn = Number(process.env.EXPIRATION_TIME_REFRESH_TOKEN);
                const refreshSessions = await computedUser.getRefreshsessions();

                if(refreshSessions.length >= Number(process.env.ACTIVE_REFRESH_SESSIONS_COUNT)) {
                    refreshSessions.forEach(el => el.destroy());
                }

                const refreshToken = await computedUser.createRefreshsession({
                    fingerprint: fingerprint,
                });
                
                const payload = { id: computedUser.id };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.EXPIRATION_TIME_ACCESS_TOKEN });

                res.cookie('refreshToken', refreshToken.refreshtoken, { httpOnly: true, maxAge: expiresIn, domain: process.env.DOMAIN, path: '/api/auth' });

                res.json({
                    accessToken,
                    user,
                });
            } else {
                res.json({ error: { type: 'login', message: 'Проверьте правильность введённых данных' } });
            }
        } else {
            res.json({ error: { type: 'login', message: 'Проверьте правильность введённых данных' } });
        }
    } catch (error) {
        res.json({ error: { type: 'login', message: error.message } });
    }
};

exports.refreshTokens = async(req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if(token) {
            const fingerprint = req.body.fingerprint;
            const currentRefreshSession = await RefreshSession.findOne({ where: { refreshtoken: token } });
    
            if(currentRefreshSession) {
                const oldFingerprint = currentRefreshSession.fingerprint;
                const expiresIn = currentRefreshSession.expiresin;
                const userID = currentRefreshSession.userId;
    
                await RefreshSession.destroy({ where: { refreshtoken: req.cookies.refreshToken } });
    
                if(oldFingerprint === fingerprint) {
                    const payload = { id: userID };
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.EXPIRATION_TIME_ACCESS_TOKEN });
    
                    const refreshToken = await RefreshSession.create({
                        userId: userID,
                        fingerprint,
                        expiresin: expiresIn,
                    });
    
                    res.cookie('refreshToken', refreshToken.refreshtoken, { httpOnly: true, maxAge: expiresIn, domain:  process.env.DOMAIN, path: '/api/auth' })
                        .json({ accessToken });
                } else {
                    res.json({ error: { type: 'refreshToken', message: 'Токен скомпрометирован' } });
                }
            } else {
                res.json({ error: { type: 'refreshToken', message: 'Сессия не найдена' } });
            }
        } else {
            res.json({ error: {  type: 'refreshToken', message: 'Токен не найден' } });
        }
    } catch (error) {
        res.json({ error: { type: 'refreshToken', message: error.message } });
    }
};

exports.logout = async(req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if(token) {
            const deletedSession = await RefreshSession.destroy({ where: { refreshtoken: token } });

            if(deletedSession) {
                res.clearCookie('refreshToken').sendStatus(200);
            } else {
                res.json({ error: { type: 'logout', message: 'Удалить сессию не удалось' } });
            }
        } else {
            res.json({ error: { type: 'logout', message: 'Сессия не найдена' } });
        }
    } catch (error) {
        res.json({ error: { type: 'logout', message: error.message } });
    }
};