const Sequelize = require('sequelize')
// var sequelize = new Sequelize('database', 'username', 'password', {
var sequelize = new Sequelize('webadmin', 'www', 'www', {
    host: 'localhost',
    dialect: 'mysql',//|'sqlite'|'postgres'|'mssql'
    
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    },

    //SQlite only
    storge: 'path/to/database/sqlite'
});

module.exports = {
    sequelize,
}
sequelize
    .authenticate()
    .then(()=>{
        console.log('DB mysql connect success')
    })
    .catch(err =>{
        console.log('DB mysql connect failure',err)
    })

// const administrators = sequelize.define(
//     'administrators',
//     {
//         id:{
//             type: DataTypes.INTEGER(11),
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
//         timestamps: false
//     }
// )
transaction 
sequelize.transaction().then((t) =>{
    var now = Date.now()
    administrators.create({
        adminName:'test01',
        password: 'test01',
        number: '18862601693',
        email: 'dfa@qwe.com',
        description: 'this is test',
        createdAt: now,
        updatedAt: now,
        status: '1'
    },
    {
        transaction: t
    }).then(()=>{
        t.commit();
    }).catch((error)=>{
        console.log(error);
        t.rollback();
        console.log(t)
    })
})