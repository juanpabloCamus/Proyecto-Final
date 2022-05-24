const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('education', {
        institution:{
            type:DataTypes.STRING,
            allowNull: false
        },
        degree:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.STRING,
        },
        start_date:{
            type:DataTypes.DATEONLY
        },
        end_date:{
            type:DataTypes.DATEONLY
        }
    })
}