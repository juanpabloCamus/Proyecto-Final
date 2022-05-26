const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user_account', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {return `${this.name} ${this.last_name}`;}
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
        date_birth:{
            type:DataTypes.DATEONLY
        },
        profile_pic: {
            type:DataTypes.TEXT
        },
        description: {
            type:DataTypes.TEXT
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timestamps:false})
}