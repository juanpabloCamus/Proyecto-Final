const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('job', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        position: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT
        },

        time: {
            type: DataTypes.STRING
        },

        salary_range: {
            type: DataTypes.STRING
        },

        english_level: {
            type: DataTypes.STRING
        },

        requirements: {
            type: DataTypes.TEXT
        }
    })
    }