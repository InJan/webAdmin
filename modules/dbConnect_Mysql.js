const Sequelize = require('sequelize')
const MysqlConfig = require('../config/config');

var sequelize = new Sequelize(MysqlConfig.database,MysqlConfig.username, MysqlConfig.password, {
    host: MysqlConfig.host,
    dialect: 'mysql',//|'sqlite'|'postgres'|'mssql'
    
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    //logging : console.log,
    logging : false,
    // logging: console.log,
    //SQlite only
    storge: 'path/to/database/sqlite'
});

/**test mysql connection */
sequelize
    .authenticate()
    .then(()=>{
        console.log('DB mysql/webadmin connect success')
    })
    .catch(err =>{
        console.log('DB mysql/webadmin connect failure',err)
    })
    
module.exports = {
    sequelize,
}


// const administrators = sequelize.define(
//     'administrators',
//     {
//         id:{
//             type: Sequelize.INTEGER(11),
//             autoIncrement: true,
//             primaryKey: true
//         },
//         adminName:{
//             type: Sequelize.STRING
//         },
//         password: Sequelize.STRING(100),
//         number: Sequelize.STRING(100),
//         email: Sequelize.STRING(100),
//         description: Sequelize.STRING(100),
//         createdAt: Sequelize.BIGINT,
//         updatedAt: Sequelize.BIGINT,
//         status: Sequelize.STRING(100),
//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     }
// )
// administrators.sync({})
// sequelize.transaction().then((t) =>{
//     var now = Date.now()
//     administrators.create({
//         adminName:'test01',
//         password: 'test01',
//         number: '18862601693',
//         email: 'dfa@qwe.com',
//         description: 'this is test',
//         createdAt: now,
//         updatedAt: now,
//         status: '1'
//     },
//     {
//         transaction: t
//     }).then(()=>{
//         t.commit();
//     }).catch((error)=>{
//         // console.log(error);
//         t.rollback();
//         // console.log(t)
//     })
// })