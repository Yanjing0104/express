var express = require('express');
var router = express.Router();
var bodyparse = require('body-parser');
var connection = require('../../config/db');
router.use(bodyparse.urlencoded({ extended: false }))
router.use(bodyparse.json())
router.post('/submit',(req,res)=>{
    let sql="insert into goods ("
    for (var i in req.body){
        sql+= i+','
    }
    sql=sql.slice(0,-1)+') values ('
    for (var i in req.body){
        sql+= `'${req.body[i]}',`
    }
    sql=sql.slice(0,-1)+')'
    console.log(sql);
    connection.query(sql,function (err,result) {
        if (result.affectedRows == 1) {
            res.send('success')
        }
        else {
            res.send('fail')
        }
    })
})
module.exports = router