const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usernotis', {
        codeNoti:{
            type: DataTypes.INTEGER
        }
    },{updatedAt:false})
}