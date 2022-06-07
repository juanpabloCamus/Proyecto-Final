const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('applied_job', {
        pdf:{
            type:DataTypes.TEXT
        },
        description:{
            type:DataTypes.TEXT
        },
        timeRange:{
            type: DataTypes.ENUM('Any time','8hs - 12hs', '12hs - 16hs', '16hs - 20hs')
        }
    },{updatedAt:false})
}