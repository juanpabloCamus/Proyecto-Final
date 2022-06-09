const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('meeting', {
        messege:{
            type: DataTypes.TEXT
        },
        dateTime:{
            type: DataTypes.STRING
        },
        status:{
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        idMeeting:{
            type: DataTypes.STRING
        }
    },{timestamps:false})
}