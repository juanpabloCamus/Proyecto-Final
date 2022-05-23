const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('UserAccount', {
        id:{
            type: DataTypes.UUID, 
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        last_name:{
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
            }
        },
        date_birth:{
            type:DataTypes.DATEONLY
        },
        profile_pic: {
            type:DataTypes.STRING
        },
        description: {
            type:DataTypes.STRING
        }
    })
}