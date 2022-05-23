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
            type: DataTypes.STRING(1000)
        },

        time: {
            type: DataTypes.STRING
        },

        salaryRange: {
            type: DataTypes.STRING
        },

        english_level: {
            type: DataTypes.STRING
        },

        requirements: {
            type: DataTypes.STRING(1000)
        }
    })
    }