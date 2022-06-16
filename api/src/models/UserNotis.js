const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usernotis', {
        codeNoti:{
            type: DataTypes.INTEGER
        },
        check:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{updatedAt:false})
}