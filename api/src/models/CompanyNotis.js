const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compnotis', {
        codeNoti:{
            type: DataTypes.INTEGER
        }
    },{updatedAt:false})
}