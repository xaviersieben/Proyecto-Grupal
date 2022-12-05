const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM('in process', 'confirmed'),
            allowNull: false,
            defaultValue:'in process'
        },
           quantity:{
            type: DataTypes.INTEGER,
        },
        price:{
            type: DataTypes.REAL,
        }
    });
};

