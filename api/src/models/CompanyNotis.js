const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('compnotis', {
        codeNoti:{
            type: DataTypes.INTEGER
        },
        check:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{updatedAt:false})
}