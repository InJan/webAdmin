const moment = require('moment')
const Sequelize = require('sequelize')
module.exports = function(sequelize){
    return sequelize.define(
        'courses',
        {
            id:{
                type: Sequelize.INTEGER(11),
                autoIncrement: true,
                primaryKey: true
            },
            title:{
                type: Sequelize.STRING
            },
            pictureurl_s: Sequelize.STRING(100),
            pictureurl_m: Sequelize.STRING(100),
            availability: Sequelize.BIGINT,
            introduction: Sequelize.TEXT,
            classfication: Sequelize.STRING(100),
            detail: Sequelize.TEXT,
            tags: Sequelize.STRING(100),
            features: Sequelize.TEXT,
            createdAt: Sequelize.BIGINT,
            updatedAt: Sequelize.BIGINT,
            status:Sequelize.BIGINT,
        },
        {
            timestamps: false,
            // 如果为 true 则表的名称和 model 相同，即 user
            // 为 false MySQL创建的表名称会是复数 users
            // 如果指定的表名称本就是复数形式则不变
            freezeTableName: true
        })
}