const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('applied_job', {
        pdf:{
            type:DataTypes.TEXT
        },
        description:{
            type:DataTypes.TEXT
        }
    })
}