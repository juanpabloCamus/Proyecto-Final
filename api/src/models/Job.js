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
            type: DataTypes.ENUM('Not specified', 'Part-Time', 'Full-Time'),
            defaultValue: 'Not specified'
        },

        salary_range: {
            type: DataTypes.ENUM('Not specified','0$ - 1000$','1000$ - 3000$','3000$ - 6000$','6000$ - 10000$','10000$'),
            defaultValue: 'Not specified'
        },

        english_level: {
            type: DataTypes.ENUM('Not specified','Basic','Conversational', 'Advanced or Native'),
            defaultValue: 'Not specified'
        },

        requirements: {
            type: DataTypes.TEXT
        },

        seniority: {
            type: DataTypes.ENUM('Not specified','Junior', 'Semi-Senior', 'Senior'),
            defaultValue: 'Not specified'
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        reports:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reportSpam:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reportLang:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reportFalse:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reportCoIn:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    },{updatedAt:false})
    }