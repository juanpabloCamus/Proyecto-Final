const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usernotis', {
        companyName:{
            type: DataTypes.STRING
        },
        codeNoti:{
            type: DataTypes.INTEGER
        }
    },{updatedAt:false})
}