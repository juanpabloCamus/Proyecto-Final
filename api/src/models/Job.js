const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('job', {
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

        language: {
            type: DataTypes.STRING
        },

        requirements: {
            type: DataTypes.TEXT
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timestamps:false})
    }