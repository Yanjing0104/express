var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.99.215.121',
  user     : 'myproject',
  password : 'yj19950104',
  database : 'myproject'
});
connection.connect();

connection.query('SELECT * from manage', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  // console.log('The solution is: ', results[0].solution);
});
