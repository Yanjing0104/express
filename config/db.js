// var mysql=require('mysql');
//本地
// let connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'myproject',
//     multipleStatements: true
// });
//服务器
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.99.215.121',
  user     : 'myWebsite',
  password : 'yj19950104',
  database : 'myWebsite',
});

connection.connect();
module.exports = connection;
