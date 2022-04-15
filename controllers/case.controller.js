require('dotenv').config();

const db = require('../models');
const Case = db.cases;

exports.create = async(req, res) => {
    try {
        const { data } = req.body;

        const workCase = await Case.create(data);

        if(workCase) {
            res.sendStatus(200);
        } else {
            res.json({ error: { type: 'create', message: 'Не удалось создать статью' } });
        }
    } catch (error) {
        res.json({ error: { type: 'create', message: error.message } });
    }
};

exports.getAll = async(req, res) => {
    try {
        const cases = await Case.findAll({ attributes: { exclude: ['updatedAt', 'text'] } });

        if(cases) {
            res.json(cases);
        } else {
            res.json({ error: { type: 'getAll', message: 'Не удалось получить список статей' } });
        }
    } catch (error) {
        res.json({ error: { type: 'getAll', message: error.message } });
    }
};

exports.get = async(req, res) => {
    try {
        const { id } = req.params;
    
        const workCase = await Case.findByPk(id, { attributes: { exclude: ['id', 'updatedAt'] } });

        if(workCase) {
            res.json(workCase);
        } else {
            res.josn({ error: { type: 'get', message: 'Не удалось получить статью' }});
        }
    } catch (error) {
        res.json({ error: { type: 'get', message: error.message } });
    }
};