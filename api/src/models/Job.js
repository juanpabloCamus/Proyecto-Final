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

        english_level: {
            type: DataTypes.STRING
        },

        requirements: {
            type: DataTypes.TEXT
        },

        state:{
            type: DataTypes.ENUM('active', 'disabled')
        },

        active: {
            type: DataTypes.BOOLEAN
        }
    },{timestamps:false})
    }