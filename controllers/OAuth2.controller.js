require('dotenv').config();

const db = require('../models');
const Origin = db.origins;
const User = db.users;
const jwt = require('jsonwebtoken');

exports.registerOrigin = async(req, res) => {
    try {
        const { data } = req.body;

        const computedOrigin = await Origin.findOne({ where: { host: data.host } });

        if(!computedOrigin) {
            await Origin.create(data);

            res.sendStatus(200);
        } else {
            res.json({ error: { type: 'host', message: 'Данный хост уже зарегистрирован' } });
        }
    } catch (error) {
        res.json({ error: { type: 'createOrigin', message: error.message } });
    }
};

exports.createOAuth2Code = async(req, res) => {
    try {
        const id = JSON.parse(Buffer.from(req.headers.accesstoken.split('.')[1], 'base64').toString('utf8')).id;
        const code = jwt.sign({ id }, process.env.CODE_SECRET_KEY, { expiresIn: process.env.EXPIRATION_TIME_CODE });

        res.json({ code });
    } catch (error) {
        res.json({ error: { type: 'createOAuth2Code', message: error.message } });
    }
};

exports.getUserInfo = async(req, res) => {
    try {
        const code = req.headers.code;

        const id = JSON.parse(Buffer.from(code.split('.')[1], 'base64').toString('utf8')).id;

        const user = await User.findByPk(id, { attributes: ['name', 'surname', 'phone'] });
        
        if(user) {
            res.json(user);
        } else {
            res.json({ error: { type: 'getUserInfo', message: 'Пользователь не найден' } });
        }
    } catch (error) {
        res.json({ error: { type: 'getUserInfo', message: error.message }})
    }
};