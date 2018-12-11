var mysql      = require('mysql');
var connection = mysql.createConnection({
    hoot:'47.99.215.121',
    // socketPath:'http://47.99.215.121',
    user:'root',
    password:'yj19950104',
    database:'myproject'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});