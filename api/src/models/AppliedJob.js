const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('applied_job', {

        pdf:{
            type:DataTypes.TEXT
        },

        description:{
            type:DataTypes.TEXT
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timestamps:false})
}