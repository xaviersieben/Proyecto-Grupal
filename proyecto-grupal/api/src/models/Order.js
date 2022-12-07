const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM('created','in process','cancelled', 'confirmed'),
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        price:{
            type: DataTypes.REAL,
        }
    });
};

