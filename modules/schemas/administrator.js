const moment = require('moment')
module.exports = function(sequelize, DataTypes){
    return sequelize.define(
        'administrators',
        {
            id:{
                type: DataTypes.INTEGER(11),
                autoIncrement: true,
                primaryKey: true
            },
            adminName:{
                type: Sequelize.STRING
            },
            password: Sequelize.STRING(100),
            number: Sequelize.STRING(100),
            email: Sequelize.STRING(100),
            description: Sequelize.STRING(100),
            createdAt: Sequelize.BIGINT,
            updatedAt: Sequelize.BIGINT,
            status: Sequelize.STRING(100),
        },
        {
            timestamps: false,
            // 如果为 true 则表的名称和 model 相同，即 user
            // 为 false MySQL创建的表名称会是复数 users
            // 如果指定的表名称本就是复数形式则不变
            freezeTableName: true
        })
}