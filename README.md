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
//dbConnect_Mysql.js 中
//logging: false;
//logging: console.log;
是否输出sql executing log
------

#部署注意事项

mysql
mysql>create webadmin;
mysql>grant all privileges on webadmin.* to 'www'@localhost identified by 'www';

program
$npm install
$npm start

something need to be finished 
Token login authenication

add Pages 

and write doc
