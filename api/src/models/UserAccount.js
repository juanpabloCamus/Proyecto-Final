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
            defaultValue:'https://espaciores.org/wp-content/uploads/2021/07/cohete.png'
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
            defaultValue: 'https://community.khoros.com/t5/image/serverpage/image-id/164425iE641E9340947FE57/image-size/large/is-moderation-mode/true?v=v2&px=999'
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
        },
        reports:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },{timestamps:false})
}
