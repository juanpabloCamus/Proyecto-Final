const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user_account', {
        fullName:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            },
            unique:true
        },
        profileType:{
            type:DataTypes.STRING,
        },
        date_birth:{
            type:DataTypes.DATEONLY
        },
        profile_pic: {
            type:DataTypes.TEXT
        },
        description: {
            type:DataTypes.TEXT
        },
        profileType:{
            type: DataTypes.ENUM('develop','admin')
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timestamps:false})
}