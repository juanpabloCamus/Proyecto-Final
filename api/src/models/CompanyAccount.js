const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('company_account', {
        id: {
            type: DataTypes.UUID, 
            defaultValue: UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        country: {
            type: DataTypes.STRING,
        },

        city: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validator:{
                isEmail: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        logo: {
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.STRING
        },

        specialty: {
            type: DataTypes.STRING
        },

        size: {
            type: DataTypes.STRING
        },

        foundation: {
            type: DataTypes.DATEONLY
        },

        web_site: {
            type: DataTypes.STRING
        },

        banner: {
            type: DataTypes.STRING
        },

    })
}