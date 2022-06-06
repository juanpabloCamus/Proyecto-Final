const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user_account', {
        fullName:{
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
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        date_birth:{
            type:DataTypes.DATEONLY
        },
        profile_pic: {
            type:DataTypes.TEXT,
            defaultValue:'https://w7.pngwing.com/pngs/837/779/png-transparent-computer-icons-rocket-launch-launch-pad-icons-purple-violet-spacecraft.png'
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
        },
        stack: {
            type: DataTypes.STRING
        },
        banner: {
            type: DataTypes.TEXT,
            defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/User_page_banner.png'
        },
        currentJob: {
            type: DataTypes.STRING,
            defaultValue:'Searching Job...'
        },
        country: {
            type: DataTypes.STRING,
        },

        city: {
            type: DataTypes.STRING,
        },
      
        seniority: {
            type: DataTypes.ENUM('Not specified','Junior', 'Semi-Senior', 'Senior'),
            defaultValue: 'Not specified'
        },
        english_level: {
            type: DataTypes.ENUM('Not specified','Basic','Conversational', 'Advanced or Native'),
            defaultValue: 'Not specified'
        }
    },{timestamps:false})
}