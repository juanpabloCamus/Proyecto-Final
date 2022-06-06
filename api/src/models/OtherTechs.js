const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('otherTechs', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        count:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },{timestamps:false})
}