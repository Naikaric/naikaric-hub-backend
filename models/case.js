module.exports = (sequelize, Sequelize) => {
    const Case = sequelize.define('case', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        preview: {
            type: Sequelize.TEXT,
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });

    return Case;
};