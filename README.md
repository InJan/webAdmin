# webAdmin

UI: 

    X-admin

Framework: 

    koa2

Database:

    mongoDB

Koa-logger:主要用途，控制台输出请求回应的状态。(测试需要，现已关闭)

pagination.js 的使用需要在页面js 中写goPage(pageNum)//pageNum开始显示页码(首发)
-------
/dbConnect_Mysql.js 中
    // disable logging; default: console.log
    //executing log
    logging: true,
改为 logging: false; 这不输出sql executing log
------

#部署注意事项

mysql
mysql>create webadmin;
mysql>grant all privileges on webadmin.* to 'www'@localhost identified by 'www';

program
$npm install
$npm start