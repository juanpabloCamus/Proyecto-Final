const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('technology', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        
        active: {
            type: DataTypes.BOOLEAN
        }
    },{timestamps:false})
}