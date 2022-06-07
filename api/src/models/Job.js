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
            type: DataTypes.ENUM('Not Specified', 'Part-Time', 'Full-Time'),
            defaultValue: 'Not Specified'
        },

        salary_range: {
            type: DataTypes.ENUM('Not Specified','0$ - 1000$','1000$ - 3000$','3000$ - 6000$','6000$ - 10000$','10000$'),
            defaultValue: 'Not Specified'
        },

        english_level: {
            type: DataTypes.ENUM('Not required','Basic','Conversational', 'Advanced or Native'),
            defaultValue: 'Not required'
        },

        requirements: {
            type: DataTypes.TEXT
        },

        seniority: {
            type: DataTypes.ENUM('Not Specified','Junior', 'Semi-Senior', 'Senior'),
            defaultValue: 'Not Specified'
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        reports:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },{timestamps:false})
    }