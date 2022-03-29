module.exports = (sequelize, Sequelize) => {
    const Origin = sequelize.define('origin', {
        host: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Origin;
};