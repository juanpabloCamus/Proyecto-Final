const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compnotis', {
        userName:{
            type: DataTypes.STRING
        },
        codeNoti:{
            type: DataTypes.INTEGER
        }
    },{updatedAt:false})
}