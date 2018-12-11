var mysql=require('mysql');
//本地
// let connection=mysql.createConnection({
//     hoot:'localhost',
//     user:'root',
//     password:'123456',
//     database:'myproject',
//     multipleStatements: true
// });
//服务器
let connection=mysql.createConnection({
    hoot:'47.99.215.121',
    user:'root',
    password:'123456',
    database:'myproject'
    // multipleStatements: true
});
connection.connect();
module.exports = connection;
