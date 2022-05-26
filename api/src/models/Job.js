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
            type: DataTypes.ENUM('No Especificado', 'Part-Time', 'Full-Time'),
            defaultValue: 'No Especificado'
        },

        salary_range: {
            type: DataTypes.ENUM('No Especificado','0$ - 1000$','1000$ - 3000$','3000$ - 6000$','6000$ - 10000$','+ 10000$'),
            defaultValue: 'No Especificado'
        },

        english_level: {
            type: DataTypes.ENUM('No Requerido','Basic','Conversational', 'Advanced or Native'),
            defaultValue: 'No Requerido'
        },

        requirements: {
            type: DataTypes.TEXT
        },

        seniority: {
            type: DataTypes.ENUM('No Especificado','Junior', 'Semi-Senior', 'Senior'),
            defaultValue: 'No Especificado'
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timestamps:false})
    }