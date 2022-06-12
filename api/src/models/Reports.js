const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('report_type', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },{timestamps:false})
}