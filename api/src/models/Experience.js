const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('experience', {
        company:{
            type:DataTypes.STRING,
            allowNull: false
        },
        position:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.TEXT,
        },
        start_date:{
            type:DataTypes.DATEONLY
        },
        end_date:{
            type:DataTypes.DATEONLY
        }
    },{timestamps:false})
}