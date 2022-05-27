const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('language', {
        name:{
            type: DataTypes.STRING,
            unique: true
        },
    },{timestamps:false})
}