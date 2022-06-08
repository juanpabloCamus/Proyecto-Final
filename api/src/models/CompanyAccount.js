const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('company_account', {
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
            },
            unique:true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        logo: {
            type: DataTypes.TEXT,
            defaultValue: 'https://w7.pngwing.com/pngs/837/779/png-transparent-computer-icons-rocket-launch-launch-pad-icons-purple-violet-spacecraft.png'
        },

        description: {
            type: DataTypes.TEXT
        },

        speciality: {
            type: DataTypes.STRING
        },
        
        size: {
            type: DataTypes.ENUM('Not Specified','0 - 500','500 - 2000','2000 - 5000','5000 - 10000','10000 - 50000','+50000'),
            defaultValue: 'Not Specified'
        },

        foundation: {
            type: DataTypes.DATEONLY
        },

        web_site: {
            type: DataTypes.TEXT,
            validator:{
                isUrl: true
            }
        },

        banner: {
            type: DataTypes.TEXT,
            defaultValue: 'https://leadcoat.com/wp-content/uploads/2019/02/Default-Banner.png'
        },

        profileType: {
            type: DataTypes.ENUM('company')
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        reports:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        premium:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        premiumDate:{
            type: DataTypes.DATE,
        }

    },{timestamps:false})
}