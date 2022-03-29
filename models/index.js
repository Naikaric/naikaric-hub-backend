require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.refreshSessions = require('./refreshSession')(sequelize, Sequelize);
db.origins = require('./origin')(sequelize, Sequelize);

db.users.hasMany(db.refreshSessions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = db;