require('dotenv').config();

module.exports = (sequelize, Sequelize) => {
    const RefreshSession = sequelize.define('refreshsession', {
        refreshtoken: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        fingerprint: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expiresin: {
            type: Sequelize.BIGINT,
            defaultValue: Number(process.env.EXPIRATION_TIME_REFRESH_TOKEN),
            allowNull: false,
        },
    });

    return RefreshSession;
};