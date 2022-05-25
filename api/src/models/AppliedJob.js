const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('applied_job', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        id_user:{
            type: DataTypes.INTEGER
        },

        id_job:{
            type: DataTypes.INTEGER
        },

        pdf:{
            type:DataTypes.TEXT
        },

        description:{
            type:DataTypes.TEXT
        },

        active: {
            type: DataTypes.BOOLEAN
        }
    },{timestamps:false})
}