require('dotenv').config();

const db = require('../models');
const User = db.users;

const bcrypt = require('bcrypt');

exports.create = async(req, res) => {
    try {
        const { data } = req.body;

        const computedUser = await User.findOne({ where: { phone: data.phone } });

        if(!computedUser) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const newPassword = await bcrypt.hash(data.password, salt);

            data.password = newPassword;

            await User.create(data);

            res.sendStatus(200);
        } else {
            res.json({ error: { type: 'phone', message: 'Пользователь с указанным номером уже существует' } });
        }
    } catch (error) {
        res.json({ error: { type: 'create', message: error.message } });
    }
};

exports.get = async(req, res) => {
    try {
        const { id } = req.params;
    
        const user = await User.findByPk(id, { attributes: { exclude: ['createdAt', 'id', 'password', 'updatedAt'] } });
    
        if(user) {
            res.json(user);
        } else {
            res.json({ error: { type: 'get', message: 'Пользователь не найден' } });
        }
    } catch (error) {
        res.json({ error: { type: 'get', message: error.message } });
    }
};

exports.update = async(req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        await User.update(data, { where: { id } });

        res.sendStatus(200);
    } catch (error) {
        res.json({ error: { type: 'update', message: error.message } });
    }
};

exports.delete = async(req, res) => {
    try {
        const { id } = req.params;

        await User.destroy({ where: { id } });

        res.sendStatus(200);
    } catch (error) {
        res.json({ error: { type: 'delete', message: error.message } });
    }
};